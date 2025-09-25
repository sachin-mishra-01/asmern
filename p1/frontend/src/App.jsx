import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import NotesDashboard from "./pages/NotesDashboard";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if logged in, go to notes
    if (token) navigate("/notes");
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/notes" /> : <Login />} />
      <Route path="/notes" element={token ? <NotesDashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
