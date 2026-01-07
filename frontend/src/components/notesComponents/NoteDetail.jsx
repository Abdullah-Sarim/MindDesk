import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function NoteDetail() {
  const { id } = useParams();
  const location = useLocation();

  //Try to get note from navigation state first
  const [note, setNote] = useState(location.state?.note || null);
  const [loading, setLoading] = useState(!note);

  useEffect(() => {
    if (note) return;

    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data.note);
      } catch {
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, note]);

  if (loading) return <p className="p-6">Loading note...</p>;
  if (!note) return <p className="p-6">Note not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>

      <p className="text-gray-700 whitespace-pre-wrap mb-4">
        {note.content}
      </p>

      {note.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
