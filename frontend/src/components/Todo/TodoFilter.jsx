function TodoFilters({
  priority,
  setPriority,
  tag,
  setTag,
  status,
  setStatus,
  availableTags,
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {/* STATUS */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded sm:px-2 py-2"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {/* PRIORITY */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded sm:px-2 py-2"
      >
        <option value="">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* TAG */}
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="border rounded sm:px-2 py-2"
      >
        <option value="">All tags</option>
        {availableTags.map((t) => (
          <option key={t} value={t}>
            #{t}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TodoFilters;
