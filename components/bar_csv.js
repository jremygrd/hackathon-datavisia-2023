import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';

const Chart = ({ chartWidth, chartHeight }) => {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data/top10s.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);

      const results = Papa.parse(csv, { header: true });
      const data = results.data.filter(row=> row["year"]!=="undefined");
      // Count songs per year
      const songsPerYear = data.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + 1;
        return acc;
      }, {});
      delete(songsPerYear["undefined"]) 


      const years = Object.keys(songsPerYear);
      const songCounts = Object.values(songsPerYear);

      const minCount = Math.min(...songCounts);
      const maxCount = Math.max(...songCounts);

      // Function to get color based on song count
      const getColor = count => {
        const ratio = (count - minCount) / (maxCount - minCount);
        const redComponent = Math.round(255 * ratio);
        return `rgba(${redComponent}, 0, 0, 0.2)`;  // Red component varies, green and blue are 0
      };

      // Get colors for each year
      const backgroundColors = songCounts.map(getColor);

      setChartData({
        labels: years,
        datasets: [{
          label: 'Number of songs',
          data: songCounts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        }],
      });
    }

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    animation: {
      delay: 10,
      easing: 'easeInOutCubic',
      responsive: true,
    },
  };

  return (
    chartData && (
      <Bar
        data={chartData}
        options={options}
      />
    )
  );
};

export default Chart;
