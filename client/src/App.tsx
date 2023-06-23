import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/index.tsx";
import Home from "./pages/Home/index.tsx";
import Login from "./pages/Login/index.tsx";
import Signup from "./pages/Signup/index.tsx";
import Shows from "./pages/Shows/index.tsx";
import Movies from "./pages/Movies/index.tsx";
import SavedList from "./pages/Saved/index.tsx";
import Footer from "./components/Footer/index.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/shows" component={Shows} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/saved" component={SavedList} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
          <Footer />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
