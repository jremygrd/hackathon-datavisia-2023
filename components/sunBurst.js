import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ChartComponent = ({ trigger, data, awards_key }) => {
  const transformData = () => {
    const transformedData = {};
    data.forEach(({ genre, Artist: artist, [awards_key]: totalAwards }) => {
      totalAwards = Number(totalAwards); // Convert to number
      
      if (!transformedData[genre]) {
        transformedData[genre] = {
          name: genre,
          children: [],
          value: 0,
        };
      }

      transformedData[genre].children.push({
        name: artist,
        value: totalAwards,
      });

      transformedData[genre].value += totalAwards;
    });

    return Object.values(transformedData);
  };

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: ({ data }) => {
          return `${data.name}: ${data.value} ${awards_key.toLowerCase()}`
        },
      },
      series: [
        {
          type: trigger ? 'sunburst' : 'treemap',
          data: transformData(),
          radius: [0, '90%'],
          label: { position: 'inside' },
          universalTransition: true,
        },
      ],
    };
  };

  return <ReactEcharts option={getOption()} style={{ height: '100%', width: '100%' }} />;
};

export default ChartComponent;
