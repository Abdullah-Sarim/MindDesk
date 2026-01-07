function FocusToggle({ focusMode, setFocusMode }) {
  return (
    <button
      onClick={() => setFocusMode((prev) => !prev)}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        focusMode
          ? "bg-red-500 text-white"
          : "bg-gray-300 text-gray-700 hover:bg-blue-400"
      }`}
    >
      {focusMode ? "F-Mode ON" : "F-Mode"}
    </button>
  );
}

export default FocusToggle;
