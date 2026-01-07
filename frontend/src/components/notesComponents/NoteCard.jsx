import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import ReactMarkdown from "react-markdown";
import DeleteConfirmButton from "../DeleteConfirmButton";

export default function NoteCard({ note, setNotes, onOpen }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");

  const togglePin = async () => {
    const { data } = await api.put(`/notes/update/${note._id}`, {
      isPinned: !note.isPinned,
    });

    setNotes((prev) => prev.map((n) => (n._id === note._id ? data.note : n)));
  };

  // SAVE EDIT
  const saveEdit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.put(`/notes/update/${note._id}`, {
        title,
        content,
      });

      setNotes((prev) => prev.map((n) => (n._id === note._id ? data.note : n)));

      setIsEditing(false);
    } catch {
      toast.error("Failed to update note");
    }
  };

  const deleteNote = async () => {
    try {
      await api.delete(`/notes/delete/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const COLORS = [
    "bg-blue-50 border-blue-500",
    "bg-purple-50 border-purple-500",
    "bg-pink-50 border-pink-500",
    "bg-indigo-50 border-indigo-500",
    "bg-green-50 border-green-500",
    "bg-yellow-50 border-yellow-500",
    "bg-red-50 border-red-500",
  ];

  const getRandomColor = (id) => {
    if (!id) return "bg-gray-50";
    const index = id
      .toString()
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return COLORS[index % COLORS.length];
  };

  const color = getRandomColor(note._id);

  return (
    <div
      className={`${color} p-4 rounded-2xl shadow hover:shadow-md border-l-4 transition `}
    >
      {/* ${note.isPinned ? "border-purple-500" : "border-gray-200"} */}
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2 font-semibold"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full border rounded px-2 py-1"
          />

          <div className="flex gap-3 mt-3 text-sm">
            <button onClick={saveEdit} className="text-green-600 hover:underline">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* TOP ACTIONS */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={togglePin} className="text-sm">
              {note.isPinned ? "⭐ Unpin" : "☆ Pin"}
            </button>

            <button
              onClick={onOpen}
              className="text-sm bg-purple-200 hover:bg-purple-400 text-black px-3 py-1 rounded"
            >
              Open
            </button>
          </div>

          <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>

          {note.content && (
            <div className="text-sm text-gray-600 mt-1 line-clamp-4">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          )}

          {/* TAGS */}
          {note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {note.linkedTodoId && (
            <span className="text-xs text-blue-600">🔗 Linked to Todo</span>
          )}

          {/* BOTTOM ACTIONS */}
          <div className="flex gap-4 mt-3 text-sm">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-600 hover:underline"
            >
              Edit
            </button>
            {/* <button onClick={deleteNote} className="text-red-600">
               Delete
            </button> */}

            <DeleteConfirmButton
              title="Delete Note"
              message="Are you sure you want to delete this note?"
              onDelete={deleteNote}
            />
          </div>
        </>
      )}
    </div>
  );
}
