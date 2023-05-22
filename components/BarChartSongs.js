import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ReactEcharts from 'echarts-for-react';

const SongChart = () => {
  const [songData, setSongData] = useState(null);
  
  useEffect(() => {
    axios.get('/data/hackathon_song_normalize.csv').then(response => {
      Papa.parse(response.data, {
        header: true,
        complete: function(results) {
          const validData = results.data.filter(song => song.name && song.year);
          setSongData(validData);
        }
      });
    });
  }, []);

  if (!songData) return <div>Loading...</div>;

  // Preprocess data
  let years = {};
  songData.forEach(song => {
    years[song.year] = (years[song.year] || 0) + 1;
  });

  // Create arrays for chart
  let yearList = Object.keys(years).sort();
  let data =  yearList.map(year => years[year])

  let options = {
    title: {
      text: 'Number of Songs per Year',
      textStyle: {
        color: '#8439FE',
      },
    },
    tooltip: {
      textStyle: {
        color: '#8439FE', 
      },
      borderColor: '#8439FE',
      position: function (point, params, dom, rect, size) {
        // return an array specifying the position [left, top]
        return [point[0], point[1]];
      }
    },
    xAxis: {
      data: yearList,
      axisLine: {
        lineStyle: {
          color: '#8439FE',
        },
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#8439FE',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#9055f0',
        },
      },
    },
    series: [{
      name: 'Registrations',
      type: 'bar',
      data: data,
      itemStyle: {
        color: '#8439FE', 
      },
      emphasis: {
        scale: false, // Whether to zoom the sector when hovering over the bar chart. Default is false.
        itemStyle: {
            shadowBlur: 10, // The shadow blur size when hovering.
            shadowOffsetX: 0, // The horizontal offset of the shadow when hovering.
            shadowColor: 'rgba(0, 0, 0, 0.5)' // The color of the shadow when hovering.
        }
    }
    }],
  };

  return (
    <div>
      <ReactEcharts option={options} />
    </div>
  );
};

export default SongChart;
