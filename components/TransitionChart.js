import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

// Fake data
const femaleData = Array.from({ length: 50 }, () => [Math.random() * 100 + 50, Math.random() * 100 + 50]);
const maleData = Array.from({ length: 50 }, () => [Math.random() * 100 + 50, Math.random() * 100 + 50]);

function calculateAverage(data, dim) {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i][dim];
    }
    return total /= data.length;
}

const scatterOption = {
    tooltip: {
        formatter: function (params) {
            return `${params.seriesName} <br/> Axis 1: ${params.value[0].toFixed(2)} <br/> Axis 2: ${params.value[1].toFixed(2)}`;
        }
    },
    xAxis: {
        scale: true
    },
    yAxis: {
        scale: true
    },
    series: [
        {
            type: 'scatter',
            id: 'female',
            dataGroupId: 'female',
            universalTransition: {
                enabled: true,
                delay: function (idx, count) {
                    return Math.random() * 400;
                }
            },
            data: femaleData
        },
        {
            type: 'scatter',
            id: 'male',
            dataGroupId: 'male',
            universalTransition: {
                enabled: true,
                delay: function (idx, count) {
                    return Math.random() * 400;
                }
            },
            data: maleData
        }
    ]
};

const barOption = {
    tooltip: {
        formatter: function (params) {
            return `${params.name} <br/> Average: ${params.value.toFixed(2)}`;
        }
    },
    xAxis: {
        type: 'category',
        data: ['Female', 'Male']
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            id: 'total',
            data: [
                {
                    value: calculateAverage(maleData, 0),
                    groupId: 'male'
                },
                {
                    value: calculateAverage(femaleData, 0),
                    groupId: 'female'
                }
            ],
            universalTransition: {
                enabled: true,
                seriesKey: ['female', 'male'],
                delay: function (idx, count) {
                    return Math.random() * 400;
                }
            }
        }
    ]
};

const AnimatedChart = () => {
    const [option, setOption] = useState(scatterOption);
    return (
        <div style={{ height: '100%', width: '100%' }} onClick={() => setOption(prevOption => (prevOption === scatterOption ? barOption : scatterOption))}>
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true}/>
        </div>

    )
};

export default AnimatedChart;
