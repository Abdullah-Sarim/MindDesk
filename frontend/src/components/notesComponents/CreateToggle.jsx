function CreateToggle({ mode, setMode }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <button
        onClick={() => setMode("todo")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          mode === "todo"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        ✔ Todo
      </button>

      <button
        onClick={() => setMode("note")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          mode === "note"
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        📝 Note
      </button>
    </div>
  );
}

export default CreateToggle;
