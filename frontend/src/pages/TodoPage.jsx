import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import TodoCard from "../components/Todo/TodoCard";
import TodoFilters from "../components/Todo/TodoFilter";
import FocusToggle from "../components/Todo/FocusMode";
import { useLocation } from "react-router-dom";
import CreateTodoModal from "../components/Todo/CreateTodoModal";
import { BackButton } from "../components/Button";
import TodoStatsCards from "../components/charts/TodoStatsCard";
import TodoProgressChart from "../components/charts/TodoProgressChart";

function TodoPage() {
  const [showCreate, setShowCreate] = useState(false);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  //filters
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("all");

  //focus mode
  const [focusMode, setFocusMode] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchTodos();
  }, [location.pathname]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/todo/fetch");
      setTodos(Array.isArray(data.todos) ? data.todos.filter(Boolean) : []);
    } catch {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  //available tags
  const availableTags = [...new Set(todos.flatMap((t) => t.tags || []))];

  // base filters
  const filteredTodos = useMemo(() => {
    return todos
      .filter(Boolean)
      .filter((t) =>
        status === "all"
          ? true
          : status === "completed"
          ? t.completed
          : !t.completed
      )
      .filter((t) => (priority ? t.priority === priority : true))
      .filter((t) => (tag ? t.tags?.includes(tag) : true));
  }, [todos, priority, tag, status]);

  //Focus Mode logic
  const focusTodos = useMemo(() => {
    if (!focusMode) return filteredTodos;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return filteredTodos.filter((t) => {
      if (t.completed) return false;

      const deadline = t.deadline ? new Date(t.deadline) : null;

      if (deadline) {
        deadline.setHours(0, 0, 0, 0);
        if (deadline < today) return true; // overdue
        if (deadline.getTime() === today.getTime()) return true; // today
      }

      return t.priority === "high";
    });
  }, [focusMode, filteredTodos]);

  const sortedTodos = useMemo(() => {
    return [...focusTodos].sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1; // pinned first
    });
  }, [focusTodos]);

  return (
    <div className="min-h-screen p- bg-gray-100">
      <div className=" mx-auto space-y-6 p- ">
        {/* <div
        className="
    sticky top-0 z-50
    flex justify-between items-center
    mb-4 px-4 py-3
    bg-white/70 backdrop-blur-md
    border-b border-gray-200
  "
      > */}

        {/* HEADER */}
        <div
          className="
    sticky top-0 z-40
    flex justify-between items-center
    mb-2 sm:px-6 px-2 py-2
    bg-white/40 backdrop-blur-md
    border-b border-gray-200
  ">
          <div className="flex flex-col gap-1">
            <h1 className="text-[23px] sm:text-3xl font-bold text-gray-800">Todos</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* <BackButton label="Back" className="bg-gray-300" /> */}
            <FocusToggle focusMode={focusMode} setFocusMode={setFocusMode} />
            <button
              onClick={() => setShowCreate(true)}
              className="sm:block hidden bg-gray-300 hover:bg-blue-400 text-black px-4 py-2 rounded-lg font-semibold"
            >
              ➕ Todo
            </button>
            <button
              onClick={() => setShowCreate(true)}
              className="sm:hidden bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              ➕
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5">
          {/* LEFT SIDE: STATS + CHART */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* FILTERS */}
            <div className="flex justify-center items-center gap-4">
              <TodoFilters
                priority={priority}
                setPriority={setPriority}
                tag={tag}
                setTag={setTag}
                status={status}
                setStatus={setStatus}
                availableTags={availableTags}
              />
            </div>
            <TodoStatsCards todos={todos} />
            <TodoProgressChart todos={todos} />
          </div>

          {/* RIGHT SIDE: TODO LIST */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl p-3 flex flex-col h-[calc(100vh-150px)]">
            <div className="overflow-y-auto pr-2 flex-1">
              {loading ? (
                <p className="text-gray-500">Loading todos...</p>
              ) : focusTodos.length === 0 ? (
                <p className="text-gray-400 text-center">No todos found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortedTodos.map((todo) => (
                    <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CREATE TODO MODAL */}
        <CreateTodoModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
}

export default TodoPage;
