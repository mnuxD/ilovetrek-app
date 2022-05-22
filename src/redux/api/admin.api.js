import API_SERVER from "./api.server.js";

const ENDPOINTS = {
  LOGIN: "/api/admin/login",
  GET_ONE_ADMIN: "/api/admin",
};

export const loginAdmin = (admin) => {
  const path = `${API_SERVER}${ENDPOINTS.LOGIN}`;
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ token: data.token, _id: data._id, role: data.role });
      })
      .catch((err) => {
        reject({ error: err, alert: true });
      });
  });
};

export const getOneAdmin = (id) => {
  const token = JSON.parse(localStorage.getItem("infoUserILoveTrekApp")).token;
  const path = `${API_SERVER}${ENDPOINTS.GET_ONE_ADMIN}/${id}`;
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
