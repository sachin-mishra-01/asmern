import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const { login, loading, error } = useContext(AuthContext);

  async function submit(e) {
    e.preventDefault();
    const r = await login(email.trim().toLowerCase(), password);
    if (!r.ok) {
      alert(r.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-slate-700">FabNotes — Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@acme.test"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              className="w-full mt-1 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          <div>Test accounts (password: <b>password</b>):</div>
          <ul className="list-disc ml-5 mt-1">
            <li>admin@acme.test (Admin)</li>
            <li>user@acme.test (Member)</li>
            <li>admin@globex.test (Admin)</li>
            <li>user@globex.test (Member)</li>
          </ul>
        </div>
        {error && <div className="mt-3 text-red-600">{error}</div>}
      </div>
    </div>
  );
}
