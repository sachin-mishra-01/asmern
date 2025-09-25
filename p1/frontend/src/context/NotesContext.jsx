import React, { createContext, useReducer, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

const initial = {
  notes: [],
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };
    case "LOAD_SUCCESS":
      return { ...state, loading: false, notes: action.notes };
    case "LOAD_FAIL":
      return { ...state, loading: false, error: action.error };
    case "ADD_NOTE":
      return { ...state, notes: [action.note, ...state.notes] };
    case "REMOVE_NOTE":
      return { ...state, notes: state.notes.filter(n => n._id !== action.id) };
    case "UPDATE_NOTE":
      return { ...state, notes: state.notes.map(n => (n._id === action.note._id ? action.note : n)) };
    default:
      return state;
  }
}

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) loadNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadNotes() {
    dispatch({ type: "LOAD_START" });
    try {
      const r = await api("/api/notes", "GET");
      if (!r.ok) throw new Error(r.body?.error || "Failed to load notes");
      dispatch({ type: "LOAD_SUCCESS", notes: r.body });
    } catch (err) {
      dispatch({ type: "LOAD_FAIL", error: err.message });
    }
  }

  async function createNote(payload) {
    try {
      const r = await api("/api/notes", "POST", payload);
      if (!r.ok) throw new Error(r.body?.error || "Failed");
      dispatch({ type: "ADD_NOTE", note: r.body });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  async function deleteNote(id) {
    try {
      const r = await api(`/api/notes/${id}`, "DELETE");
      if (!r.ok) throw new Error(r.body?.error || "Delete failed");
      dispatch({ type: "REMOVE_NOTE", id });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  async function updateNote(id, payload) {
    try {
      const r = await api(`/api/notes/${id}`, "PUT", payload);
      if (!r.ok) throw new Error(r.body?.error || "Update failed");
      dispatch({ type: "UPDATE_NOTE", note: r.body });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  return (
    <NotesContext.Provider value={{ ...state, loadNotes, createNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}
