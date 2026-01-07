import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function CreateNoteModal({ onClose, onCreated, linkedTodoId = null }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    if (!title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/notes/create", {
        title,
        content,
        linkedTodoId,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      toast.success("Note created");
      onCreated?.();
      onClose();
    } catch {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-extrabold text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 border-b pb-2">
          Create Note
        </h2>

        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="border focus:outline-none focus:ring-2 focus:ring-purple-400 border-gray-300 rounded px-4 py-3 font-semibold"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note... (Markdown supported)"
            rows={4}
            className="border focus:outline-none focus:ring-2 focus:ring-purple-400 border-gray-300 rounded px-4 py-3"
          />

          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="border focus:outline-none focus:ring-2 focus:ring-purple-400 border-gray-300 rounded px-4 py-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={createNote}
            disabled={loading}
            className="
              bg-purple-500 hover:bg-purple-600
              disabled:opacity-60
              text-white
              px-5 py-2.5
              rounded-lg
              font-semibold
              transition
            "
          >
            {loading ? "Creating..." : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNoteModal;
