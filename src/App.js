import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ingresar" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
