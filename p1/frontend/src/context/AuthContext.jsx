import React, { createContext, useReducer, useEffect } from "react";
import api from "../utils/api";

const initial = {
  token: null,
  user: null,
  loading: false,
  error: null
};

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, token: action.token, user: action.user };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.error };
    case "LOGOUT":
      return { token: null, user: null, loading: false, error: null };
    default:
      return state;
  }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    // rehydrate from localStorage
    const token = localStorage.getItem("fab_token");
    if (token) {
      const payload = decodeToken(token);
      if (payload) {
        dispatch({ type: "LOGIN_SUCCESS", token, user: { email: payload.email || "", role: payload.role, tenantSlug: payload.tenantSlug } });
      } else {
        localStorage.removeItem("fab_token");
      }
    }
  }, []);

  async function login(email, password) {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Login failed");
      const token = j.token;
      localStorage.setItem("fab_token", token);
      const payload = decodeToken(token) || {};
      const user = { email: j.user?.email || email, role: payload.role || j.user?.role, tenantSlug: payload.tenantSlug || j.user?.tenantSlug };
      dispatch({ type: "LOGIN_SUCCESS", token, user });
      return { ok: true };
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", error: err.message });
      return { ok: false, error: err.message };
    }
  }

  function logout() {
    localStorage.removeItem("fab_token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
