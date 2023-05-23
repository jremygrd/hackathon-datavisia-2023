import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const ParallelChart = ({ data }) => {
    const [preparedData, setPreparedData] = useState([]);
    console.log(preparedData)

    // Attributes to be displayed in the chart
    const attributes = [
        'genre',
        'acousticness',
        'danceability',
        'duration_ms',
        'energy',
        'instrumentalness',
        'liveness',
        'loudness',
        'popularity',
        'speechiness',
        'tempo',
        'valence',
        'name',
    ];

    var schema = [
      { name: 'genre', index: 0, text: 'genre' },
      { name: 'danceability', index: 1, text: 'danceability' },
      { name: 'duration_ms', index: 2, text: 'duration_ms' },
      { name: 'energy', index: 3, text: 'energy' },
      { name: 'instrumentalness', index: 4, text: ' instrumentalness' },
      
      { name: 'popularity', index: 9, text: 'popularity' },
      { name: 'acousticness', index: 5, text: 'acousticness' },
      
    ];

    useEffect(() => {
        const newData = data.map(song => {
            // Add the color as the last attribute of the song
            return [
                ...attributes.map(attr => song[attr])
            ];
        });
        setPreparedData(newData);
        console.log(newData)
    }, [data]);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: params => {
            if (params.componentType === 'series') {
              console.log(params)
                return `${params.value[12]}`;
            }
            return '';
        },
    },
    parallel: {
      inactiveOpacity: 0,
  },
      backgroundColor: '#333',
    
        parallelAxis: [
            ...attributes.map((attr, index) => ({
                dim: index,
                name: attr,
            })),
            // Add an extra axis for the genre
            { dim: attributes.genre, name: 'genre' },
        ],
        parallelAxis: [
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text },
          { dim: 6, name: schema[6].text },
          {
            dim: 0,
            name: schema[0].text,
            type: 'category',
            data: ['rock', 'country', 'metal', 'hiphop', 'r&b',
            'dance/electronic', 'folk/acoustic', 'easylistening', 'latin',
            'blues', 'set()', 'world/traditional', 'jazz', 'classical','pop']
          }
        ],
        visualMap: {
          show: true,
          min: 0,
          max: 1,
          dimension: 6,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
          }
        },
        series: [
            {
                name: 'Songs',
                type: 'parallel',
                lineStyle: {
                    width: 1,
                    // Use the genre (which is now a number) to select a color
                    color: { type: 'category', dimension: attributes.length },
                },
                data: preparedData,
            },
        ],
    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            className='react_for_echarts'
        />
    )
};

export default ParallelChart;
