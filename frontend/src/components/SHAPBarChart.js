import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const SHAPBarChart = ({ shapValues }) => {
  const sortedEntries = Object.entries(shapValues)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    // .slice(0, 10); // Top 10 impactful features

  const labels = sortedEntries.map(([key]) => key);
  const values = sortedEntries.map(([_, val]) => val);


  const data = {
    labels,
    datasets: [
      {
        label: "SHAP Value (Impact)",
        data: values,
        backgroundColor: values.map((v) => v >= 0 ? "rgba(0, 51, 153, 0.6)" : "rgba(228, 21, 21, 0.61)"),
      }
    ]
  };

  // Chart options
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Top SHAP Feature Contributions"
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function (val) {
            return `${val}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SHAPBarChart;
