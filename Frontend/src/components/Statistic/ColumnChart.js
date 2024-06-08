import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  getLast4Days,
  getLast4Months,
  getLast4Weeks,
  getLast4Years,
} from "../../utils/formatDatetime";

function ColumnChart(props) {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        title: {
          text: "",
        },
        categories: [],
      },
      yaxis: {
        title: {
          text: "Number of oranges",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  useEffect(() => {
    const currentDate = new Date();
    let xLabel = "";
    let categories = [];

    const seriesData = [
      {
        name: "Đạt",
        data: props.totalFreshFilter,
        color: "#3bc992e6",
      },
      {
        name: "Không đạt",
        data: props.totalRottenFilter,
        color: "#7140809c",
      },
    ];

    switch (props.valueOption) {
      case "1":
        xLabel = "Ngày";
        categories = getLast4Days(currentDate).map(
          (day) => `${day}/${currentDate.getMonth() + 1}`
        );
        break;
      case "2":
        xLabel = "Tuần";
        categories = getLast4Weeks(currentDate);
        break;
      case "3":
        xLabel = "Tháng";
        categories = getLast4Months(currentDate);
        break;
      case "4":
        xLabel = "Năm";
        categories = getLast4Years(currentDate).map((year) => `${year}`);
        break;
      default:
        break;
    }

    setChartData((prevData) => ({
      ...prevData,
      series: seriesData,
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          title: {
            text: xLabel,
          },
          categories: categories,
        },
      },
    }));
  }, [props]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          series={chartData.series}
          options={chartData.options}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ColumnChart;
