import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function CreateNoteForm({ notes, setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const createNote = async () => {
    if (!title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      const { data } = await api.post("/notes/create", {
        title,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      const { note } = data;
      setNotes((prev) => [note, ...prev]);

      toast.success("Note created");

      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="w-full bg-white/90 p-5 rounded-2xl shadow-xl">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 border-b pb-2">
        Create Note
      </h2>

      {/* FORM */}
      <div className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="border border-gray-300 rounded px-4 py-3 font-semibold"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={4}
          className="border border-gray-300 rounded px-4 py-3"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="border border-gray-300 rounded px-4 py-3"
        />
      </div>

      {/* ACTION */}
      <button
        onClick={createNote}
        className="
          mt-4 mb-5
          bg-purple-500 hover:bg-purple-600
          text-white
          py-3
          w-full
          rounded-lg
          font-semibold
          transition
        "
      >
        Add Note
      </button>
    </div>
  );
}

export default CreateNoteForm;
