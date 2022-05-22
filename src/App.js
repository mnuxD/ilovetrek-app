import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SearchPlace } from "./pages/SearchPlace";
import { Place } from "./pages/Place";
import { Profile } from "./pages/Profile";
import { ConvertGuide } from "./pages/ConvertGuide";
import { CreatePlace } from "./pages/CreatePlace";
import { LayoutLeft } from "./components/LayoutLeft";
import { LoginAdmin } from "./adminPages/LoginAdmin";
import { PlacesAdmin } from "./adminPages/PlacesAdmin";
import { UsersAdmin } from "./adminPages/UsersAdmin";
import { ViewUser } from "./adminPages/ViewUser";
import {
  PrivateRouteAdmin,
  PrivateRouteBoth,
  PrivateRouteUser,
  PrivateRouteGuide,
  PrivateRouteAdminGuide,
} from "./components/PrivateRoutes/PrivateRoutes";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <LayoutLeft
        body={
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/admin/ingresar" element={<LoginAdmin />} />

            {/* User and Guide Routes */}
            <Route
              path="/buscar-destino"
              element={
                <PrivateRouteBoth routeAux={"/ingresar"}>
                  <SearchPlace />
                </PrivateRouteBoth>
              }
            />
            <Route
              path="/buscar-destino/destino/:id"
              element={
                <PrivateRouteBoth routeAux={"/ingresar"}>
                  <Place />
                </PrivateRouteBoth>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRouteBoth routeAux={"/ingresar"}>
                  <Profile />
                </PrivateRouteBoth>
              }
            />

            {/* User Routes */}
            <Route
              path="/convertirme-en-guia"
              element={
                <PrivateRouteUser routeAux={"/ingresar"}>
                  <ConvertGuide />
                </PrivateRouteUser>
              }
            />

            {/* Guide Routes */}
            <Route
              path="/crear-destino"
              element={
                <PrivateRouteAdminGuide routeAux={"/ingresar"}>
                  <CreatePlace />
                </PrivateRouteAdminGuide>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/usuarios"
              element={
                <PrivateRouteAdmin routeAux={"/ingresar"}>
                  <UsersAdmin />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/usuario/:id"
              element={
                <PrivateRouteAdmin routeAux={"/ingresar"}>
                  <ViewUser />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/destinos"
              element={
                <PrivateRouteAdmin routeAux={"/ingresar"}>
                  <PlacesAdmin />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/destinos/:id"
              element={
                <PrivateRouteAdmin routeAux={"/ingresar"}>
                  <Place />
                </PrivateRouteAdmin>
              }
            />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
