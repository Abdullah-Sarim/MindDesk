function AddTodo({
  title,
  setTitle,
  newTodo,
  setNewTodo,
  priority,
  setPriority,
  tags,
  setTags,
  newDeadline,
  setNewDeadline,
  onAdd,
}) {

  return (
    <div className="flex flex-col gap-3 mb-5">
      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title (required)"
        className="border border-gray-300 rounded px-4 py-3 font-semibold"
      />

      {/* TEXT / DESCRIPTION */}
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="Todo details..."
        className="border border-gray-300 rounded px-4 py-3"
      />

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Deadline</label>
        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="border rounded px-2 py-2"
        />
      </div>
      {/* PRIORITY */}
<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="border rounded px-3 py-2"
>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</select>

{/* TAGS */}
<input
  value={tags}
  onChange={(e) => setTags(e.target.value)}
  placeholder="Tags (comma separated)"
  className="border rounded px-3 py-2"
/>


      <button
        onClick={onAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
