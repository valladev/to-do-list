import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}