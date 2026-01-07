import TodoContainer from "./TodoContainer";

function CreateTodoModal({ isOpen, onClose, setTodos }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-extrabold text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <TodoContainer
          todos={[]}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
}

export default CreateTodoModal;
