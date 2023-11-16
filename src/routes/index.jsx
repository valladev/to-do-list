import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Task from "../pages/task";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Task />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}