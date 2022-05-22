import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  CREATE: "/api/rating/create",
  GET_BY_PLACE: "/api/rating",
  DELETE: "/api/rating/delete",
};

export const createRating = (rating) => {
  const path = `${API_SERVER}${ENDPOINTS.CREATE}`;
  const token = JSON.parse(localStorage.getItem("infoUserILoveTrekApp")).token;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(rating),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const getRatingByPlace = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUserILoveTrekApp")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_BY_PLACE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const deleteRating = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUserILoveTrekApp")).token;
  const path = `${API_SERVER}${ENDPOINTS.DELETE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
