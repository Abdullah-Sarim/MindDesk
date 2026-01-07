import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoContainer from "../components/Todo/TodoContainer";
import { TodoList } from "../components/Todo/TodoContainer";
import CreateToggle from "../components/notesComponents/CreateToggle";
import CreateNoteForm from "../components/notesComponents/CreateNotesForm";
import NotesTitleList from "../components/notesComponents/NotesTitleList";
import NoteDetailModal from "../components/notesComponents/NoteDetailModel";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("todo");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/todo/fetch");

        const sorted = data.todos.sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setTodos(sorted);
      } catch {
        toast.error("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await api.get("/notes/fetch");
        setNotes(data.notes ?? []);
      } catch {
        toast.error("Failed to fetch notes");
      } finally {
        setNotesLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user/userInfo");
        setUser(data.user);
      } catch {
        toast.error("Failed to fetch user info");
      }
    };
    fetchUser();
  }, []);

  const safeTodos = Array.isArray(todos) ? todos.filter(Boolean) : [];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.16), transparent 50%), linear-gradient(135deg, #6b7280, #111827)",
      }}
    >
      <Navbar user={user} todos={safeTodos}/>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-13 gap-5 p-4 max-w-7xl mx-auto">
        {/* LEFT: SIDEBAR (LG ONLY) */}
        <div className="hidden lg:block lg:col-span-3">
          {user && <Sidebar user={user} todos={safeTodos} notes={notes} />}
        </div>

        {/* CENTER: CREATE (TODO / NOTE) */}
        <div
          className="
      order-1
      md:order-2
      md:col-span-2
      lg:order-3
      lg:col-span-5
    "
        >
          <div className="w-full bg-white/90 p-5 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 border-b">
              {mode === "todo" ? "Todo" : "Note"}
            </h2>

            <CreateToggle mode={mode} setMode={setMode} />

            {mode === "todo" ? (
              <TodoContainer
                todos={safeTodos}
                setTodos={setTodos}
                loading={loading}
              />
            ) : (
              <CreateNoteForm notes={notes} setNotes={setNotes} />
            )}
          </div>
        </div>

        {/* RIGHT: LIST PANEL (SWITCHES BASED ON MODE) */}
        <div
          className="
    order-2
    md:order-1
    md:col-span-2
    lg:order-2
    lg:col-span-5
    bg-white/90 p-5 rounded-2xl shadow-xl
    transition-all duration-300 ease-in-out
  "
        >
          {mode === "todo" ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Todo List
              </h2>

              <TodoList
                todos={safeTodos}
                setTodos={setTodos}
                loading={loading}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Notes List
              </h2>

              <NotesTitleList
                notes={notes}
                onSelectNote={(note) => {
                  setSelectedNote(note);
                  setIsNoteOpen(true);
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* <ConfirmModal
        isOpen={open}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      /> */}

      <NoteDetailModal
        note={selectedNote}
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
      />
    </div>
  );
}
