export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem("saved_movies")
    ? JSON.parse(localStorage.getItem("saved_movies"))
    : [];

  return savedMovieIds;
};

export const getSavedShowIds = () => {
  const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : [];

  return savedShowIds;
};

export const saveMovieIds = (movieIdArr: string | any[]) => {
  if (movieIdArr.length) {
    localStorage.setItem("saved_movies", JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem("saved_movies");
  }
};

export const saveShowIds = (showIdArr: string | any[]) => {
  if (showIdArr.length) {
    localStorage.setItem("saved_shows", JSON.stringify(showIdArr));
  } else {
    localStorage.removeItem("saved_shows");
  }
};

export const removeMovieId = (id: number) => {
  const savedMovieIds = localStorage.getItem("saved_movies")
    ? JSON.parse(localStorage.getItem("saved_movies"))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter(
    (savedMovieId: any) => savedMovieId !== id
  );
  localStorage.setItem("saved_movies", JSON.stringify(updatedSavedMovieIds));

  return true;
};

export const removeShowId = (id: number) => {
  const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : null;

  if (!savedShowIds) {
    return false;
  }

  const updatedSavedShowIds = savedShowIds?.filter(
    (savedShowId: any) => savedShowId !== id
  );
  localStorage.setItem("saved_shows", JSON.stringify(updatedSavedShowIds));

  return true;
};

export const clearMovieId = () => {
  localStorage.clearItem("saved_movies");
};

export const clearShowId = () => {
  localStorage.clearItem("saved_shows");
};
