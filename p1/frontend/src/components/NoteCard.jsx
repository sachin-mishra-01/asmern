import React, { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.content || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const r = await onUpdate({ title, body });
    setSaving(false);
    if (r && !r.ok) {
      alert(r.error || "Update failed");
    } else {
      setEditing(false);
    }
  }

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      {editing ? (
        <>
          <input className="w-full p-2 border rounded mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="w-full p-2 border rounded mb-2" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="flex gap-2">
            <button onClick={save} className="px-3 py-1 bg-green-600 text-white rounded" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{note.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{note.content}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="px-2 py-1 text-sm border rounded">Edit</button>
              <button onClick={() => { if (confirm("Delete note?")) onDelete(); }} className="px-2 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2">Created: {new Date(note.createdAt).toLocaleString()}</div>
        </>
      )}
    </div>
  );
}
