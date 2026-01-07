import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

function TodoContainer({ todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");

  // CREATE TODO
  const createTodo = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.post("/todo/create", {
        title,
        text: newTodo,
        completed: false,
        priority,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        deadline: newDeadline || null,
      
      });

      const { todo } = data;
      setTodos((prev) => [todo, ...prev]);
      toast.success("Todo created");

      // reset
      setTitle("");
      setNewTodo("");
      setPriority("medium");
      setTags("");
      setNewDeadline("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create todo");
    }
  };

  return (
    <div className="w-full bg-white/90 p-5 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 border-b">
        Create Todo
      </h2>

      <AddTodo
        title={title}
        setTitle={setTitle}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        newDeadline={newDeadline}
        setNewDeadline={setNewDeadline}
        priority={priority}
        setPriority={setPriority}
        tags={tags}
        setTags={setTags}
        onAdd={createTodo}
      />
    </div>
  );
}


function TodoList({ todos, setTodos, loading }) {
  const navigate = useNavigate();
  
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (todos.length === 0) {
    return <p className="text-center text-gray-400">No todos yet.</p>;
  }

  return (<>
    <div className="max-h-124 mt-4 border-t pt-3 overflow-y-auto space-y-1">
    <div className="flex items-center justify-between  sticky top-0 bg-white/90 pb-2 px-2 py-0.5
          rounded-xl
          font-medium
          truncate">
        <h3 className="text-lg font-semibold text-gray-700">Your Todos</h3>

        <button
          onClick={() => navigate("/todo")}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Go to todos →
        </button>
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
    </>
  );
}

export{ TodoList }



export default TodoContainer;
