import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [70, 25, 5],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Bề mặt", "Mùi", "Bề mặt & mùi"],
      colors: ["#ff9300", "#3bc992e6", "#7140809c"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
