import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

function LineRaceChart() {
    const data = {
        'Pop': [12000, 14000, 16000, 18000, 20000],
        'Rock': [11000, 13000, 15000, 19000, 21000],
        'Jazz': [10000, 12000, 14000, 16000, 18000],
        'Country': [9000, 11000, 13000, 15000, 17000],
        'Classical': [8000, 10000, 12000, 14000, 16000],
    };
    const years = ['2019', '2020', '2021', '2022', '2023'];

    // A dictionary to map the genres to colors.
    const genreColors = {
        'Pop': '#FF0000',
        'Rock': '#00FF00',
        'Jazz': '#0000FF',
        'Country': '#FFFF00',
        'Classical': '#00FFFF',
    };

    const options = {
        animationDuration: 10000,
        title: {
            text: 'Money Per Year Per Genre',
            left: 'left',
        },
        
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: Object.keys(data)
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years
        },
        yAxis: {
            type: 'value'
        },
        series: Object.entries(data).map(([genre, genreData]) => ({
            name: genre,
            type: 'line',
            emphasis: {
                focus: 'series'
            },
            data: genreData,
            lineStyle: {
                color: genreColors[genre]
            },
            label: {
                show: false,
                position: 'top',
                formatter: genre
            },
            endLabel: {
                show: true,
                formatter: function (params) {
                  return genre;
                }
              },
              labelLayout: {
                moveOverlap: 'shiftY'
              },
        }))
    };

    return (
        <ReactEcharts
            echarts={echarts}
            option={options}
            style={{ height: '600px', width: '100%' }}
            className='react_for_echarts'
        />
    )
}

export default LineRaceChart;
