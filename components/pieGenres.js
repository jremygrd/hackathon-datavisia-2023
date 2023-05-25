import React from 'react';
import ReactECharts from 'echarts-for-react';

function MyChartComponent({genreData}) {
    console.log()
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
      },
    series: [
      {
        name: 'Genre',
        type: 'pie',
        center:["70%","50%"],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
        //   borderColor: '#fff',
        //   borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
            color:'#8439FE',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        data: genreData.map(item => ({
            value: item.name,
            name: item.genre
          }))
      }
    ]
  };

  return <ReactECharts option={option} />;
}

export default MyChartComponent;
