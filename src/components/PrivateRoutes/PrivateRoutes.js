import { Navigate } from "react-router-dom";

export const PrivateRouteAdmin = ({ children, routeAux }) => {
  const adminInfo = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"));
  if (adminInfo) {
    return adminInfo.role === "admin" ? children : <Navigate to={routeAux} />;
  } else {
    return <Navigate to={routeAux} />;
  }
};

export const PrivateRouteBoth = ({ children, routeAux }) => {
  const userInfo = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"));
  if (userInfo) {
    return userInfo.role === "user" || "guide" ? (
      children
    ) : (
      <Navigate to={routeAux} />
    );
  } else {
    return <Navigate to={routeAux} />;
  }
};

export const PrivateRouteAdminGuide = ({ children, routeAux }) => {
  const userInfo = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"));
  if (userInfo) {
    return userInfo.role === "admin" || "guide" ? (
      children
    ) : (
      <Navigate to={routeAux} />
    );
  } else {
    return <Navigate to={routeAux} />;
  }
};

export const PrivateRouteGuide = ({ children, routeAux }) => {
  const userInfo = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"));
  if (userInfo) {
    return userInfo.role === "guide" ? children : <Navigate to={routeAux} />;
  } else {
    return <Navigate to={routeAux} />;
  }
};

export const PrivateRouteUser = ({ children, routeAux }) => {
  const userInfo = JSON.parse(localStorage.getItem("infoUserILoveTrekApp"));
  if (userInfo) {
    return userInfo.role === "user" ? children : <Navigate to={routeAux} />;
  } else {
    return <Navigate to={routeAux} />;
  }
};
