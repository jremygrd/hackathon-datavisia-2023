import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ParallelChart = () => {
    const option = {
        tooltip: {
            formatter: params => {
                const data = params.data;
                return `${params.seriesName}<br/>Song: ${data[6]}<br/>Dimension 1: ${data[1]}<br/>Dimension 2: ${data[2]}<br/>Dimension 3: ${data[3]}<br/>Dimension 4: ${data[4]}<br/>Dimension 5: ${data[5]}`;
            }
        },
        legend: {
            data: ['pop', 'electro', 'rap', 'afro', 'kpop'],
            align: 'left',
            bottom: 10
        },
        parallelAxis: [
            { dim: 0, name: 'Category', type: 'category', data: ['pop', 'electro', 'rap', 'afro', 'kpop'] },
            { dim: 1, name: 'Dimension 1', min: 10, max: 30 },
            { dim: 2, name: 'Dimension 2', min: 15, max: 30 },
            { dim: 3, name: 'Dimension 3', min: 9, max: 32 },
            { dim: 4, name: 'Dimension 4', min: 25, max: 35 },
            { dim: 5, name: 'Dimension 5', min: 20, max: 33 }
        ],
        series: [
            {
                name: 'pop',
                type: 'parallel',
                lineStyle: { width: 4 },
                data: [
                    ['pop', 10, 15, 9, 30, 20, 'Song 1']
                ]
            },
            {
                name: 'electro',
                type: 'parallel',
                lineStyle: { width: 4 },
                data: [
                    ['electro', 20, 25, 19, 33, 27, 'Song 2']
                ]
            },
            {
                name: 'rap',
                type: 'parallel',
                lineStyle: { width: 4 },
                data: [
                    ['rap', 12, 30, 20, 25, 33, 'Song 3']
                ]
            },
            {
                name: 'afro',
                type: 'parallel',
                lineStyle: { width: 4 },
                data: [
                    ['afro', 25, 20, 26, 30, 26, 'Song 4']
                ]
            },
            {
                name: 'kpop',
                type: 'parallel',
                lineStyle: { width: 4 },
                data: [
                    ['kpop', 30, 28, 32, 35, 30, 'Song 5']
                ]
            }
        ]
    };
    
    return (
        <ReactEcharts
            option={option}
            style={{height: '100%', width: '100%'}}
            className='react_for_echarts' />
    );
};

export default ParallelChart;
