function StatCard({ label, value, color }) {
  return (
    <div className={` rounded-2xl shadow-xl p-2 sm:p-4 text-center ${color}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function TodoStatsCards({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.filter((t) => !t.completed).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = todos.filter((t) => {
    if (t.completed || !t.deadline) return false;
    return new Date(t.deadline) < today;
  }).length;

  return (
    <div className="justify-between items-center max-w-5xl mx-auto grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <StatCard label="Total" value={total} color="text-gray-800 bg-gray-50" />
      <StatCard label="Completed" value={completed} color="text-green-600 bg-green-50" />
      <StatCard label="Pending" value={pending} color="text-yellow-600 bg-yellow-50" />
      <StatCard label="Overdue" value={overdue} color="text-red-600 bg-red-50" />
    </div>
  );
}

export default TodoStatsCards;
