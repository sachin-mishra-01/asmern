import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

function useApi() {
  const { token } = useContext(AuthContext);
  return async function api(path, method = "GET", body) {
    const base = import.meta.env.VITE_API_BASE || "";
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(base + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, body: json };
  };
}

// default export usable outside components by creating a tiny wrapper that reads token lazily
export default (function globalApi(path, method = "GET", body) {
  const token = localStorage.getItem("fab_token");
  const base = import.meta.env.VITE_API_BASE || "";
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(base + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  }).then(async (res) => {
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, body: json };
  });
});
