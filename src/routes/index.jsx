import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}