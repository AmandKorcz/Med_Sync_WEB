import { Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Atendimento from "./pages/Atendimento";
import SobreNos from "./pages/SobreNos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/atendimento" element={<Atendimento />} />
      <Route path="/sobre-nos" element={<SobreNos />} /> 
    </Routes>
  );
}

export default App;