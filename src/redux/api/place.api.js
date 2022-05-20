import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  CREATE: "/api/place/create",
  GET_PLACE: "/api/place",
  CHANGE_VERIFIED: "/api/place/verified",
  UPDATE_PLACE: "/api/place/update",
  DELETE_PLACE: "/api/place/delete",
};

export const createPlace = (place) => {
  const path = `${API_SERVER}${ENDPOINTS.CREATE}`;

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const getOnePlace = (id) => {
  //   const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_PLACE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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

export const getAllPlaces = () => {
  //   const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_PLACE}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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

export const changeVerified = (id) => {
  // const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.CHANGE_VERIFIED}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const updatePlace = ({ id, ...place }) => {
  // const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.UPDATE_PLACE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "PUT",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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

export const deletePlace = (id) => {
  // const token = JSON.parse(localStorage.getItem("infoUser")).token;
  const path = `${API_SERVER}${ENDPOINTS.DELETE_PLACE}/${id}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${token}`,
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
