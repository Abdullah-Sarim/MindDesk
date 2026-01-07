import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function NotesModal({ isOpen, onClose, todoId }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/notes/todo/${todoId}`);
        setNotes(Array.isArray(data.notes) ? data.notes.filter(Boolean) : []);
      } catch {
        toast.error("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isOpen, todoId]);

  // CREATE NOTE
  const createNote = async () => {
    if (!title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      const { data } = await api.post("/notes/create", {
        title,
        content,
        linkedTodoId: todoId,
      });

      setNotes((prev) => [data.note, ...prev]);
      setTitle("");
      setContent("");
    } catch {
      toast.error("Failed to create note");
    }
  };

  // START EDIT
  const startEdit = (note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content || "");
  };

  // SAVE EDIT
  const saveEdit = async () => {
    if (!editTitle.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.put(`/notes/update/${editingNoteId}`, {
        title: editTitle,
        content: editContent,
      });

      setNotes((prev) =>
        prev.map((n) => (n._id === editingNoteId ? data.note : n))
      );

      setEditingNoteId(null);
      setEditTitle("");
      setEditContent("");
    } catch {
      toast.error("Failed to update note");
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/delete/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      toast.error("Failed to delete note");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-5 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">📝 Notes</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        {/* CREATE NOTE */}
        <div className="space-y-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={createNote}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Note
          </button>
        </div>

        {/* NOTES LIST */}
        <div className="max-h-60 overflow-y-auto space-y-2">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : notes.length === 0 ? (
            <p className="text-center text-gray-400">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="border rounded p-3 bg-gray-50"
              >
                {editingNoteId === note._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-1"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-600"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="text-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold">{note.title}</h4>
                    {note.content && (
                      <p className="text-sm text-gray-600 mt-1">
                        {note.content}
                      </p>
                    )}

                    <div className="flex gap-3 mt-2 text-sm">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-yellow-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-600"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesModal;
