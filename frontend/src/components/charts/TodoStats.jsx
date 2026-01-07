function TodoStats({ todos }) {
  const total = todos.length;
  const safeTodos = Array.isArray(todos)
  ? todos.filter(Boolean)
  : [];

const completed = safeTodos.filter(t => t.completed).length;

  const remaining = total - completed;

  return (
    <div className="mt-8 mb-2  bg-white/80 backdrop-blur-md rounded-lg shadow px-5 py-4 text-sm text-gray-900">
      <h2 className="text-[20px] font-semibold mb-5 flex justify-center items-center gap-1">
         Todo Stats
      </h2>

      <div className="text-[17px] flex justify-between">
        <span>Total</span>
        <span className="font-medium">{total}</span>
      </div>

      <div className="text-[17px] flex justify-between text-green-600">
        <span>Completed</span>
        <span className="font-medium">{completed}</span>
      </div>

      <div className="text-[17px] flex justify-between text-orange-600">
        <span>Remaining</span>
        <span className="font-medium">{remaining}</span>
      </div>
    </div>
  );
}

export default TodoStats;
