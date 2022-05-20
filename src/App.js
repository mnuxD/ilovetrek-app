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

// Admin
import { LoginAdmin } from "./adminPages/LoginAdmin";
import { PlacesAdmin } from "./adminPages/PlacesAdmin";
import { UsersAdmin } from "./adminPages/UsersAdmin";
import { ViewUser } from "./adminPages/ViewUser";

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
            <Route path="/buscar-destino" element={<SearchPlace />} />
            <Route path="/buscar-destino/destino/:id" element={<Place />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/convertirme-en-guia" element={<ConvertGuide />} />
            <Route path="/crear-destino" element={<CreatePlace />} />

            {/* Admin Routes */}
            <Route path="/admin/ingresar" element={<LoginAdmin />} />
            <Route path="/admin/usuarios" element={<UsersAdmin />} />
            <Route path="/admin/usuario/:id" element={<ViewUser />} />
            <Route path="/admin/destinos" element={<PlacesAdmin />} />
            <Route path="/admin/destinos/:id" element={<Place />} />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
