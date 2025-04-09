import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from "./pages/Principal";
import Login from "./pages/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App; 