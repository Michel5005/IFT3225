import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DeleteUser from "./pages/DeleteUser";
import Router from "./components/Router";
import EditProfile from "./pages/EditProfile";
import Documentation from "./pages/Documentation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        <Route path="/dashboard" element={
          <Router>
            <Dashboard />
          </Router>
        } />

        <Route path="/admin/users" element={
          <Router>
            <Users />
          </Router>
        } />

        <Route path="/admin/delete" element={
          <Router>
            <DeleteUser />
          </Router>
        } />

        <Route path="/editProfile" element={
          <Router>
            <EditProfile />
          </Router>
        } />

        <Route path="/documentation" element={
          <Router>
            <Documentation />
          </Router>
        } />

      </Routes>
    </BrowserRouter>
  )
}
