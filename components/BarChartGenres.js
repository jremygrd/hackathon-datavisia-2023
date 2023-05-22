import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ReactEcharts from 'echarts-for-react';

const SongChart = () => {
  const [songData, setSongData] = useState(null);
  
  useEffect(() => {
    axios.get('/data/songs_genre_exploded.csv').then(response => {
      Papa.parse(response.data, {
        header: true,
        complete: function(results) {
          const validData = results.data.filter(song => song.year && song.genre);
          setSongData(validData);
        }
      });
    });
  }, []);

  if (!songData) return <div>Loading...</div>;

  // Preprocess data
  let years = {};
  songData.forEach(song => {
    if (!years[song.year]) years[song.year] = {};
    years[song.year][song.genre] = (years[song.year][song.genre] || 0) + 1;
  });

  // Create arrays for chart
  let yearList = Object.keys(years);
  let genreList = Array.from(new Set(songData.map(song => song.genre)));
  let data = genreList.map(genre => ({
    name: genre,
    type: 'bar',
    stack: 'total',
    data: yearList.map(year => years[year][genre] || 0)
  }));

  let options = {
    title: {
      // text: 'Songs per Year by Genre'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      position: function (point, params, dom, rect, size) {
        // return an array specifying the position [left, top]
        return [point[0], point[1]];
      }
    },
    legend: {
      data: genreList
    },
    xAxis: {
      data: yearList
    },
    yAxis: {},
    series: data
  };

  return (
    <div>
      <ReactEcharts option={options} />
    </div>
  );
};

export default SongChart;
