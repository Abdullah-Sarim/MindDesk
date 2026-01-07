import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useMemo, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const getWeeklyData = (todos) => {
  const counts = Array(7).fill(0);

  todos.forEach((t) => {
    if (!t.completed || !t.updatedAt) return;

    const day = new Date(t.updatedAt).getDay();
    const index = day === 0 ? 6 : day - 1;
    counts[index]++;
  });

  return counts;
};

const getMonthlyData = (todos) => {
  const counts = Array(12).fill(0);

  todos.forEach((t) => {
    if (!t.completed || !t.updatedAt) return;

    const month = new Date(t.updatedAt).getMonth();
    counts[month]++;
  });

  return counts;
};

function TodoProgressChart({ todos }) {
  const [mode, setMode] = useState("weekly");

  const weeklyCounts = useMemo(() => getWeeklyData(todos), [todos]);
  const monthlyCounts = useMemo(() => getMonthlyData(todos), [todos]);

  const chartData = useMemo(() => {
    if (mode === "weekly") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Completed Todos",
            data: weeklyCounts,
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      };
    }

    return {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      datasets: [
        {
          label: "Completed Todos",
          data: monthlyCounts,
        },
      ],
    };
  }, [mode, weeklyCounts, monthlyCounts]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    }),
    []
  );

  return (
    <div className="hidden sm:block justify-between items-center max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Progress
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("weekly")}
            className={`px-3 py-1 rounded ${
              mode === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 rounded ${
              mode === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="h-64">
        {mode === "weekly" ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}

export default TodoProgressChart;
