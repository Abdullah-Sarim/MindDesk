import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TodoChart({ completed, remaining }) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ["#22c55e", "#f97316"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-white/80 backdrop-blur-md rounded-lg shadow px-4 py-3">
      <h4 className="text-[20px] font-semibold mb-5 flex justify-center items-center gap-1">
        Progress Chart
      </h4>

      <div className="flex justify-center">
        <div className="w-40 h-40">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default TodoChart;
