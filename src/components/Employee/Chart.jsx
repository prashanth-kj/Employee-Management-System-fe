import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import AxiosService from "../../utils/Apiservice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmployeeWorkHoursChart() {
  const [chartLabels, setChartLabels] = useState([]); // Dates
  const [chartData, setChartData] = useState([]); // Total work hours

  const getEmployeeWorkHours = async () => {
    try {
      const response = await AxiosService.get("/timelog/workchart");
      const labels = response.data.data.map((entry) => entry.date); // Dates
      const data = response.data.data.map((entry) => parseFloat(entry.totalHours)); // Total hours

      setChartLabels(labels);
      setChartData(data);
    } catch (error) {
      console.error("Error fetching employee work hours:", error);
    }
  };

  useEffect(() => {
    getEmployeeWorkHours();
  }, []);

  // Chart.js data structure
  const barChartData = {
    labels: chartLabels, // Dates as labels
    datasets: [
      {
        label: "Total Work Hours",
        data: chartData, // Work hours for each date
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Total Work Hours Per Day" },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 7, // Show a maximum of 7 dates
        },
        title: { display: true, text: "Dates" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
      },
    },
  };
  

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Employee Work Hours by Date</h2>
      {chartLabels.length > 0 ? (
        <Bar data={barChartData} options={chartOptions} />
      ) : (
        <p>Loading work hours...</p>
      )}
    </div>
  );
}

export default EmployeeWorkHoursChart;
