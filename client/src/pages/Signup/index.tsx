import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../../utils/auth.tsx";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations.tsx";

export default function Signup() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: any;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData, email: userFormData.email.toLowerCase() },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="form">
      <h1>Signup</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <div className="signBtn">
          <Button
            className="blue"
            disabled={
              !(
                userFormData.username &&
                userFormData.email &&
                userFormData.password
              )
            }
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </Form>
    </section>
  );
}
