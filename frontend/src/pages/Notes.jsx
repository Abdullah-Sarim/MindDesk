import { useEffect, useMemo, useState, useCallback } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import NoteCard from "../components/notesComponents/NoteCard";
import CreateNoteModal from "../components/notesComponents/CreateNoteModal";
import NoteDetailModal from "../components/notesComponents/NoteDetailModel";
import { BackButton } from "../components/Button";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openNote, setOpenNote] = useState(false);

  //search + tag filter
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  //create note modal
  const [showCreate, setShowCreate] = useState(false);

  //fetch notes (memoized)
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/notes/fetch");

      setNotes(Array.isArray(data.notes) ? data.notes.filter(Boolean) : []);
    } catch {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  //unique tags (safe)
  const tags = useMemo(() => {
    return [...new Set(notes.flatMap((n) => n?.tags || []))];
  }, [notes]);

  //search + filter + pin logic
  const filteredNotes = useMemo(() => {
    return notes
      .filter(Boolean)
      .filter((n) => {
        if (!search.trim()) return true;

        const q = search.toLowerCase();
        return (
          n.title?.toLowerCase().includes(q) ||
          n.content?.toLowerCase().includes(q)
        );
      })
      .filter((n) => (activeTag ? n.tags?.includes(activeTag) : true))
      .sort((a, b) => {
        // pinned notes first
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
      });
  }, [notes, search, activeTag]);

  return (
    <div className="min-h-screen  bg-gray-100">
      {/* HEADER */}
      <h1 className="sm:hidden flex justify-center items-center text-3xl font-bold mb-4 text-gray-800">
        Your Notes
      </h1>
      <div
        className="
    sticky top-0 z-50
    flex justify-between items-center
    mb-4 px-4 py-3
    bg-white/70 backdrop-blur-md
    border-b border-gray-200
  "
      >
        <h1 className="hidden sm:block text-[25px] md:text-3xl font-bold text-gray-800">
          Your Notes
        </h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="lg:w-150 md:w-80 w-40 px-4 py-2 ml-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="flex items-center justify-between sm:gap-3 gap-1">
          <BackButton className="rounded-lg bg-gray-300 hover:bg-purple-500" />
          <button
            onClick={() => setShowCreate(true)}
            className="bg-gray-300 hover:bg-purple-500 text-white px-2.5 sm:px-5 py-2 mr-7 rounded-lg font-semibold transition "
          >
            ➕
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center px-6">
        {/* TAG FILTER */}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mx-4">
            <button
              onClick={() => setActiveTag("")}
              className={`px-2 py-1 rounded text-sm transition ${
                !activeTag ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All
            </button>

            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-2 py-1 rounded text-sm transition ${
                  activeTag === tag
                    ? "bg-purple-500 text-white"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* NOTES GRID */}
      {loading ? (
        <p className="text-gray-500">Loading notes...</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-400">No notes found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-10">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              setNotes={setNotes}
              onOpen={() => {
                setSelectedNote(note);
                setOpenNote(true);
              }}
            />
          ))}
        </div>
      )}

      {/* CREATE NOTE MODAL */}
      {showCreate && (
        <CreateNoteModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchNotes}
        />
      )}

      <NoteDetailModal
        note={selectedNote}
        isOpen={openNote}
        onClose={() => setOpenNote(false)}
        setNotes={setNotes}
      />
    </div>
  );
}

export default Notes;
