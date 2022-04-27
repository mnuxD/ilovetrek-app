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
            <Route path="/buscar-destino/place" element={<Place />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/convertirme-en-guia" element={<ConvertGuide />} />
            <Route path="/crear-destino" element={<CreatePlace />} />
          </Routes>
        }
      />
    </div>
  );
}

export default App;
