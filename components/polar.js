import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";

const Chart = ({ song, chartHeight, chartWidth}) => {
  const options = {
    maintainAspectRatio: false,
    animation: {
      delay: 10,
      easing: "easeInOutCubic",
      responsive: false,
    },
  };

  const data = {
    labels: [
      "BPM",
      "Energy",
      "Dance",
      "Live",
      "Val",
      "Dur",
      "Acous",
      "spch",
    ],
    datasets: [
      {
        label: song.title,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [song.bpm, song.nrgy, song.dnce, song.live * 10, song.val, song.dur/10, song.acous, song.spch * 10],
      },
      {
        label: "My Second hardcoded dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        data: [121, 65, 40, 39, 67, 96, 27, 100],
      },
    ],
  };


  return (
    <div>
      <Radar data={data} options={options} height={chartHeight}/>
    </div>
  );
};

export default Chart;
