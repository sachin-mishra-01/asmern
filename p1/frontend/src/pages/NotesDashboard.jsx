import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { AuthContext } from "../context/AuthContext";
import NoteCard from "../components/NoteCard";
import UpgradeBanner from "../components/UpgradeBanner";

export default function NotesDashboard() {
  const { notes, loading, createNote, deleteNote, updateNote, loadNotes } = useContext(NotesContext);
  const { user, logout } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");   // ✅ renamed body → content
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter title");
    setCreating(true);

    const r = await createNote({
      title: title.trim(),
      content: content.trim(),   // ✅ matches backend field
    });

    setCreating(false);
    if (!r.ok) {
      alert(r.error || "Failed to create note");
    } else {
      setTitle("");
      setContent("");   // ✅ reset content correctly
    }
  }

  // show upgrade banner if on free plan and reached 3 notes
  const reachedLimit = notes.length >= 3;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">FabNotes</h2>
            <div className="text-sm text-slate-600">
              Tenant: <b>{user?.tenantSlug}</b> • Role: <b>{user?.role}</b>
            </div>
          </div>
          <div>
            <button onClick={logout} className="px-4 py-2 bg-white border rounded shadow-sm">
              Logout
            </button>
          </div>
        </header>

        <main className="bg-white p-6 rounded shadow">
          <form onSubmit={submit} className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="p-2 border rounded"
                disabled={creating}
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content (optional)"
                className="p-2 border rounded"
                rows={3}
                disabled={creating}
              />
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={creating}>
                  {creating ? "Creating..." : "Create Note"}
                </button>
                <div className="text-sm text-slate-500">
                  Notes count: <b>{notes.length}</b>
                </div>
              </div>
            </div>
          </form>

          {reachedLimit && <UpgradeBanner notesCount={notes.length} />}

          <section>
            <h3 className="text-lg font-semibold mb-3">Notes</h3>
            {loading ? (
              <div>Loading...</div>
            ) : notes.length === 0 ? (
              <div className="text-slate-500">No notes yet — create one!</div>
            ) : (
              <div className="grid gap-3">
                {notes.map((n) => (
                  <NoteCard
                    key={n._id}
                    note={n}
                    onDelete={() => deleteNote(n._id)}
                    onUpdate={(payload) => updateNote(n._id, payload)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
