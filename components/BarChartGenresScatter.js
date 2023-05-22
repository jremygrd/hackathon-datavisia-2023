import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ReactEcharts from 'echarts-for-react';

const SongChart = () => {
  const [songData, setSongData] = useState(null);
  const [option, setOption] = useState(null);
  const [chartType, setChartType] = useState('scatter');

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

  useEffect(() => {
    if (songData) {
      // Preprocess data for bar chart
      let years = {};
      songData.forEach(song => {
        if (!years[song.year]) years[song.year] = {};
        years[song.year][song.genre] = (years[song.year][song.genre] || 0) + 1;
      });

      // Create arrays for bar chart
      let yearList = Object.keys(years);
      let genreList = Array.from(new Set(songData.map(song => song.genre)));
      let barData = genreList.map(genre => ({
        name: genre,
        type: 'bar',
        stack: 'total',
        data: yearList.map(year => years[year][genre] || 0),
        universalTransition: {
            enabled: true,
            delay: function (idx, count) {
                return Math.random() * 400;
            }
        }
      }));

      const barOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          position: (point) => [point[0], point[1]],
        },
        legend: { data: genreList },
        xAxis: { data: yearList },
        yAxis: {},
        series: barData,
      };

      // Preprocess data for scatter plot
      let scatterData = songData.map(song => ({
        name: song.genre,
        type: 'scatter',
        data: [[song.duration, song.popularity]],
        itemStyle: {
          color: genreList.indexOf(song.genre)
        },
        universalTransition: {
          enabled: true,
          delay: (idx, count) => Math.random() * 400,
        },
      }));

      const scatterOption = {
        xAxis: { type: 'value', name: 'duration' },
        yAxis: { type: 'value', name: 'popularity' },
        series: scatterData,
      };

      setOption(chartType === 'scatter' ? scatterOption : barOption);
    }
  }, [songData, chartType]);

  const handleChartClick = () => {
    setChartType(chartType === 'scatter' ? 'bar' : 'scatter');
  };

  if (!option) return <div>Loading...</div>;

  return (
    <div onClick={handleChartClick}>
      <ReactEcharts option={option} notMerge={true}/>
    </div>
  );
};

export default SongChart;
