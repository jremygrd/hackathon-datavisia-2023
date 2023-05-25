import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const EChartsComponent = ({artistData}) => {
    artistData.sort((a, b) => b.name - a.name);


  // prettier-ignore
//   const dataAxis = ['szihoz ozihsz osihz ', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  // prettier-ignore
//   const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];

  let dataAxis = artistData.map(data => data.artist);
let data = artistData.map(data => data.name);


  const yMax = 500;
  const dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }

  const option = {
    title: {
      text: 'Musics per artist',
      textStyle: {
        color: '#8439FE',
      },
      subtextStyle: {
        color: '#8439FE',
      },
      subtext: 'Zoom in !'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          return params[0].name + ': ' + params[0].data;
        },
      },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: false,
        color: '#8439FE'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8439FE'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ff8585' },
            // { offset: 0.5, color: '#8439FE' },
            { offset: 1, color: '#8439FE' }
          ])
        },
        emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ff8585' },
                // { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#8439FE' }
              ])
            },
            label: {  // add this label configuration to show labels on hover
              show: true,
              position: 'top',
              color: '#8439FE'
            }
          },
        data: data
      }
    ]
  };

  

  return <ReactECharts option={option} />;
};

export default EChartsComponent;
