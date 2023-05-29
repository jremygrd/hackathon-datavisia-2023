import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const GraphChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // fetch the data
        const fetchData = async () => {
            try {
                const res = await axios.get('/data/data.json');
                setChartData(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const categories = ["artist",'r&b',
    'pop',
    'hiphop',
    'metal',
    'rock',
    'dance/electronic',
    'set()',
    'folk/acoustic',
    'latin',
    'country',
    'easylistening',
    'world/traditional',
    'blues',
    'classical',
    'jazz']

    const getOption = () => ({
        type: 'graph',
        layout: 'none',
        animation: true,
        legend: {
            data: categories,
        },
        series: [
            {
                type: 'graph',
                // layout: 'force',
                // animation: true,
                // draggable: true,
                data: chartData?.nodes || [],
                links: chartData?.links || [],
                categories: categories.map((name) => ({ name })),
                roam: true,
                force: {
                    edgeLength: 15,
                    repulsion: 230,
                    gravity: 0.2,
                },
                label: {
                    position: 'right',
                    formatter: '{b}'
                  },
                  lineStyle: {
                    color: 'source',
                  },
                  emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                      width: 10
                    }
                  }
            },
        ],
    });

    return <ReactECharts option={getOption()} style={{ height: '100%', width: '100%' }} />;
};

export default GraphChart;
