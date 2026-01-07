import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import TodoItem from "../components/Todo/TodoItem";
import { useLocation } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("all");
  
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

  const availableTags = [...new Set(todos.flatMap((t) => t.tags || []))];

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

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">✅ All Todos</h1>

      <TodoFilters
        priority={priority}
        setPriority={setPriority}
        tag={tag}
        setTag={setTag}
        status={status}
        setStatus={setStatus}
        availableTags={availableTags}
      />

      {loading ? (
        <p className="text-gray-500">Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-400">No todos yet.</p>
      ) : (
        <ul className="space-y-3 max-w-2xl">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
