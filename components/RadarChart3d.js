import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

/* function getData() {
  const [moneyData, setMoneyData] = useState([]);
  useEffect(() => {
    axios.get('/data/hackathon_money_makers.csv').then(response => {
        Papa.parse(response.data, {
            header: true,
            complete: function(results) {
              setMoneyData(results.data);
            }
        });
    });
  }, []);  
  return moneyData;
}
console.log(getData()); */

class RadarPlot extends React.Component {  
  getOption = () => {
    var list = [];
    for (var i = 1; i <= 28; i++) {
      list.push(i + 2000 + '');
    }

    var series = [];
    for (var i = 1; i <= 28; i++) {
      series.push({
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1
        },
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)'
          }
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              (i * i) / 2
            ],
            name: i + 2000 + ''
          }
        ]
      });
    }

    return {
      title: {
        text: 'Proportion of Browsers',
        subtext: 'Fake Data',
        top: 10,
        left: 10
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        bottom: 10,
        data: list
      },
      visualMap: {
        top: 'middle',
        right: 10,
        color: ['red', 'yellow'],
        calculable: true
      },
      radar: {
        indicator: [
          { text: 'IE8-', max: 400 },
          { text: 'IE9+', max: 400 },
          { text: 'Safari', max: 400 },
          { text: 'Firefox', max: 400 },
          { text: 'Chrome', max: 400 }
        ]
      },
      series: series
    };
  }

  render() {
    return (
      <ReactECharts option={this.getOption()} />
    );
  }
}

export default RadarPlot;
