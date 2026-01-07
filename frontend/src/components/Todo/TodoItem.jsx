import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import CreateNoteModal from "../notesComponents/CreateNoteModal";
import PriorityBadge from "./PriorityBadge";
import DeleteConfirmButton from "../DeleteConfirmButton";

function TodoItem({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editText, setEditText] = useState(todo.text || "");
  const [editDeadline, setEditDeadline] = useState(
    todo.deadline ? todo.deadline.split("T")[0] : ""
  );
  const [openNoteModal, setOpenNoteModal] = useState(false);

  // Toggle completed
  const toggleStatus = async () => {
    try {
      setTodos((prev) =>
        prev
          .filter(Boolean)
          .map((t) =>
            t._id === todo._id ? { ...t, completed: !t.completed } : t
          )
          .sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
          )
      );

      await api.put(`/todo/update/${todo._id}`, {
        completed: !todo.completed,
      });
    } catch {
      toast.error("Failed to update todo");
    }
  };

  // Save edit
  const saveEdit = async () => {
    if (!editTitle.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.put(`/todo/update/${todo._id}`, {
        title: editTitle,
        text: editText,
        deadline: editDeadline || null,
      });

      setTodos((prev) =>
        prev.filter(Boolean).map((t) => (t._id === todo._id ? data.todo : t))
      );

      setIsEditing(false);
      setIsExpanded(false);
    } catch {
      toast.error("Failed to edit todo");
    }
  };

  // Delete
  const deleteTodo = async () => {
    try {
      await api.delete(`/todo/delete/${todo._id}`);
      setTodos((prev) => prev.filter((t) => t?._id !== todo._id));
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <li className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm border hover:bg-gray-200 transition">
      {/* TOP ROW */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleStatus}
          className="mt-1"
        />

        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full font-semibold border rounded px-2 py-1 mb-1"
              />
            </>
          ) : (
            <h3
              className={`font-semibold ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <PriorityBadge priority={todo.priority} />

          {todo.tags?.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <button onClick={saveEdit} className="text-green-600">
              💾
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500"
            >
              ✏️
            </button>
          )}

          {/* <button onClick={deleteTodo} className="text-red-500">
            🗑️
          </button> */}
          <DeleteConfirmButton
            title="Delete Todo"
            message="This action cannot be undone. Delete this todo?"
            onDelete={deleteTodo}
          />
        </div>
      </div>

      {/* EXPAND / COLLAPSE */}
      {!isEditing && todo.text && (
        <button
          onClick={() => setIsExpanded((p) => !p)}
          className="text-sm text-blue-500 mt-1"
        >
          {isExpanded ? "Hide details ▲" : "Show details ▼"}
        </button>
      )}

      {!isEditing && (
        <button
          onClick={() => setOpenNoteModal(true)}
          className="text-sm text-purple-600 mt-1"
        >
          📝 Attach note
        </button>
      )}

      {/* DETAILS */}
      {(isExpanded || isEditing) && (
        <div className="mt-2 text-sm text-gray-700 space-y-2">
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Description..."
              className="w-full border rounded px-2 py-1"
            />
          ) : (
            todo.text && <p>{todo.text}</p>
          )}

          <div className="flex items-center text-xs text-gray-500">
            {isEditing ? (
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                className="border rounded px-2 py-1"
              />
            ) : (
              <span>
                {todo.deadline
                  ? `Deadline: ${new Date(todo.deadline).toLocaleDateString()}`
                  : "No deadline"}
              </span>
            )}

            <span className="ml-auto">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
      {openNoteModal && (
        <CreateNoteModal
          linkedTodoId={todo._id}
          onClose={() => setOpenNoteModal(false)}
          onCreated={() => {
            // optional: you can show toast or refetch todo notes later
            setOpenNoteModal(false);
          }}
        />
      )}
    </li>
  );
}

export default TodoItem;
