import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import ReactMarkdown from "react-markdown";

export default function NoteDetailModal({ note, isOpen, onClose, setNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //Sync local state when a new note opens
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content || "");
      setIsEditing(false);
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const noteId = note._id;

  //PIN / UNPIN
  const togglePin = async () => {
    try {
      const { data } = await api.put(`/notes/update/${noteId}`, {
        isPinned: !note.isPinned,
      });

      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? data.note : n))
      );
    } catch {
      toast.error("Failed to update pin");
    }
  };

  //SAVE EDIT
  const saveEdit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.put(`/notes/update/${noteId}`, {
        title,
        content,
      });

      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? data.note : n))
      );

      setIsEditing(false);
    } catch {
      toast.error("Failed to update note");
    }
  };

  //DELETE NOTE
  const deleteNote = async () => {
    try {
      await api.delete(`/notes/delete/${noteId}`);

      setNotes((prev) => prev.filter((n) => n._id !== noteId));
      onClose();
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-xl max-w-2xl mx-4 rounded-2xl shadow-xl p-6  relative">

        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="flex items-center mb-3">
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold  border-b focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold mr-4">
              {note.title}
            </h2>
          )}

          <button onClick={togglePin} title="Pin note">
            {note.isPinned ? "⭐" : "☆"}
          </button>
        </div>

        {/* CONTENT */}
        <div className="mb-5 max-h-80 overflow-y-auto">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full border rounded p-2"
            />
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 text-sm">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                💾 Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-yellow-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={deleteNote}
                className="text-red-600"
              >
                🗑 Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
