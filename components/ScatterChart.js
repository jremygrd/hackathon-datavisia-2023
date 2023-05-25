import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ScatterChart = ({ data, x_axis, y_axis, width_axis }) => {
    const fakeData = [
        { acousticness: 10, tempo: 25, duration: 5, genre: 'rock', song_name: 'Rock song 1' },
        { acousticness: 20, tempo: 15, duration: 30, genre: 'pop', song_name: 'Pop song 1' },
        { acousticness: 30, tempo: 5, duration: 15, genre: 'jazz', song_name: 'Jazz song 1' },
        { acousticness: 40, tempo: 10, duration: 20, genre: 'rock', song_name: 'Rock song 2' },
    ];
    const widths = data.map(data => data[width_axis] || 0);
    const max = Math.max(...widths);
    const min = Math.min(...widths);


    const genreColors = {
        'blues': '#0000FF',
        'classical': '#800080',
        'country': '#008000',
        'dance/electronic': '#00FFFF',
        'easylistening': '#808080',
        'folk/acoustic': '#FF00FF',
        'hiphop': '#800000',
        'jazz': '#FFFF00',
        'latin': '#00FF00',
        'metal': '#008080',
        'pop': '#000080',
        'r&b': '#FFA500',
        'rock': '#FF0000',
        'set()': '#000000',
        'world/traditional': '#A52A2A'
    };


    const scatterData = data.map((data) => {
        const width = data[width_axis] || 0;
        const normalizedWidth = ((width - min) / (max - min)) * (30 - 3) + 3;
        return {
            name: data.name,
            genre: data.genre,
            value: [data[x_axis], data[y_axis], data[width_axis] || 0],
            symbolSize: width_axis ? normalizedWidth : 5,
            itemStyle: {
                color: genreColors[data.genre] || 'black',
            }
        }
    });

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.seriesName + "<br/>" +
                    params.name + "<br/>" +
                    params.value.join(', ') + "<br/>" +
                    "Genre: " + params.data.genre;
            }
        },
        xAxis: {
            name: x_axis, // Replace with the actual name you want for the x axis
            nameTextStyle: {
                color: '#8439FE',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: 12,
            },
            scale: true
        },
        yAxis: {
            name: y_axis, // Replace with the actual name you want for the y axis
            nameTextStyle: {
                color: '#8439FE',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: 12,
            },
            scale: true
        },
        series: [{
            name: 'Song',
            symbolSize: 20,
            data: scatterData,
            type: 'scatter'
        }],
        dataZoom: [
            {
                type: 'slider', // this specifies that we want a slider type data zoom tool.
                xAxisIndex: 0,  // this specifies that this data zoom component corresponds to the first x-axis. Indices start at 0.
                filterMode: 'empty'
            },
            {
                type: 'slider',
                yAxisIndex: 0,  // this data zoom component corresponds to the first y-axis
                filterMode: 'empty'
            },
            {
                type: 'inside', // this type of data zoom component allows for zooming by scrolling the mouse wheel
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
    };

    return <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />;
}

export default ScatterChart;
