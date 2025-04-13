import { Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Atendimento from "./pages/Atendimento";
import SobreNos from "./pages/SobreNos";
import Gerenciamento from "./pages/Gerenciamento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/atendimento" element={<Atendimento />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/gerenciamento" element={<Gerenciamento />} />
      <Route path="*" element={<Principal />} />
    </Routes>
  );
}

export default App;