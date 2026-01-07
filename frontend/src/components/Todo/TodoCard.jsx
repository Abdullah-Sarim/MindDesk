import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import CreateNoteModal from "../notesComponents/CreateNoteModal";
import { DeleteConfirmButton } from "../ConfirmModel";
import { useNavigate } from "react-router-dom";

function TodoCard({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text || "");
  const [priority, setPriority] = useState(todo.priority);
  const [deadline, setDeadline] = useState(
    todo.deadline ? todo.deadline.split("T")[0] : ""
  );
  const navigate = useNavigate();

  //TOGGLE COMPLETE
  const toggleStatus = async () => {
    try {
      const updated = { ...todo, completed: !todo.completed };

      setTodos((prev) => prev.map((t) => (t._id === todo._id ? updated : t)));

      await api.put(`/todo/update/${todo._id}`, {
        completed: updated.completed,
      });
    } catch {
      toast.error("Failed to update todo");
    }
  };

  //SAVE EDIT
  const saveEdit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.put(`/todo/update/${todo._id}`, {
        title,
        text,
        priority,
        deadline: deadline || null,
      });

      setTodos((prev) => prev.map((t) => (t._id === todo._id ? data.todo : t)));

      setIsEditing(false);
      toast.success("Todo updated");
    } catch {
      toast.error("Failed to update todo");
    }
  };

  //DELETE
  const deleteTodo = async () => {
    try {
      await api.delete(`/todo/delete/${todo._id}`);
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
      toast.success("Todo deleted");
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  //PIN / UNPIN
  const togglePin = async () => {
    try {
      const updated = { ...todo, isPinned: !todo.isPinned };

      setTodos((prev) => prev.map((t) => (t._id === todo._id ? updated : t)));

      await api.put(`/todo/update/${todo._id}`, {
        isPinned: updated.isPinned,
      });
    } catch {
      toast.error("Failed to update pin");
    }
  };

  const getTodoStyle = (todo) => {
    if (todo.completed) return "bg-gray-100 backdrop-blur-md border-gray-300 opacity-";

    if (todo.priority === "high" && todo.isPinned === false)
      return "bg-red-50 border-red-500";
    if (todo.priority === "medium" && todo.isPinned === false)
      return "bg-yellow-50 border-yellow-400";
    if (todo.priority === "low" && todo.isPinned === false)
      return "bg-green-50 border-green-400";
    if (todo.isPinned === true) return "bg-blue-50 border-blue-400";

    return "bg-white border-gray-300";
  };
  //  ${todo.isPinned ? "border-yellow-400" : "border-gray-200" }

  return (
    <>
      <div
        className={`border-l-3 p-3 shadow-sm ${getTodoStyle(
          todo
        )} rounded-2xl shadow-lg border transition`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-1">
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-lg border rounded px-2 py-1 w-full"
            />
          ) : (
            <h3
              className={`text-lg font-bold ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.title}
            </h3>
          )}

          <div className="flex items-center gap-2">

            <button
              onClick={togglePin}
              title="Pin todo"
              className={`text-xl ${
                todo.isPinned ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              {todo.isPinned ? "⭐" : "☆"}
            </button>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleStatus}
              className="w-5 h-5 accent-green-500"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm mb-2"
            rows={2}
          />
        ) : (
          todo.text && <p className="text-sm text-gray-600 mb-2">{todo.text}</p>
        )}
        <div className="flex justify-between">
          {/* TAGS */}
          {todo.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* META */}
          <div className="flex flex-wrap gap-2 text-xs mb-3">
            {/* PRIORITY */}
            {isEditing ? (
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            ) : (
              <span
                className={`px-2 py-1 rounded-full ${
                  priority === "high"
                    ? "bg-red-100 text-red-600"
                    : priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {priority}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 text-xs mb-3">
          {/* DEADLINE */}
          {isEditing ? (
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border rounded px-2 py-1"
            />
          ) : (
            todo.deadline && (
              <span className="px-2 py-1 rounded-full bg-gray-200">
                {new Date(todo.deadline).toLocaleDateString()}
              </span>
            )
          )}

          {/* CREATED */}
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {new Date(todo.createdAt).toLocaleString()}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center text-sm">
          <button
            onClick={() => {
              if (todo.linkedNoteId) {
                navigate(`/notes?open=${todo.linkedNoteId}`);
              } else {
                setShowNoteModal(true);
              }
            }}
            className="text-purple-600 hover:underline"
          >
            {todo.linkedNoteId ? "Open Note" : "Attach Note"}
          </button>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={saveEdit}
                  className="text-green-600 hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                {/* <button
                  onClick={deleteTodo}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button> */}
                <DeleteConfirmButton
                  title="Delete Todo"
                  message="This action cannot be undone. Delete this todo?"
                  onDelete={deleteTodo}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* <DeleteConfirmButton
        title="Delete Todo"
        message="This action cannot be undone. Delete this todo?"
        onDelete={deleteTodo}
      /> */}

      {/* ATTACH NOTE MODAL */}
      {showNoteModal && (
        <CreateNoteModal
          linkedTodoId={todo._id}
          onClose={() => setShowNoteModal(false)}
          onCreated={() => setShowNoteModal(false)}
        />
      )}
    </>
  );
}

export default TodoCard;
