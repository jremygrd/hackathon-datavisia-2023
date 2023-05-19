import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = () => {
  const data = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    usersRegistered: [100, 120, 150, 180, 200, 220, 210, 250, 280, 300, 320, 350],
  };

  const option = {
        
    title: {
      text: 'User Registrations in 2023',
      textStyle: {
        color: '#8439FE',
      },
    },
    tooltip: {
      textStyle: {
        color: '#8439FE', 
      },
      borderColor: '#8439FE',
    },
    xAxis: {
      data: data.months,
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
      data: data.usersRegistered,
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
    <div className="flex justify-center items-center h-full">
      <ReactECharts option={option} style={{width: '90%', height: '100%'}}/>
    </div>
  );
};

export default BarChart;
