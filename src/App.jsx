import { Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Atendimento from "./pages/Atendimento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/atendimento" element={<Atendimento />} />
    </Routes>
  );
}

export default App;
