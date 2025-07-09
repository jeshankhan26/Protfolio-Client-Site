// Rader.jsx
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Rader = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      title: {
        text: "Basic Radar Chart",
      },
      yaxis: {
        stepSize: 20,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },
  });

  return (
    <div className="max-w-xl mx-auto mt-10">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default Rader;
