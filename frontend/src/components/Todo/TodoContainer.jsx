import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AddTodo from "./AddTodo";

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

export default TodoContainer;
