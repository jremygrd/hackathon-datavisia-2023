import React from 'react';
import ReactECharts from 'echarts-for-react';

export default class EChartsGraph extends React.Component {
    getOption = () => {
        // // Define your data
        // const nodes = [
        //     { name: 'Node 1', category: 0 },
        //     { name: 'Node 2', category: 1 },
        //     { name: 'Node 3', category: 2 },
        //     // add more nodes as needed
        // ];
        // const links = [
        //     { source: 'Node 1', target: 'Node 2' },
        //     { source: 'Node 2', target: 'Node 3' },
        //     // add more links as needed
        // ];

        // Define your data
        const nodes = Array.from({ length: 100 }, (_, idx) => ({
            name: `Node ${idx + 1}`,
            category: idx % 5,
        }));

        const links = Array.from({ length: 99 }, (_, idx) => ({
            source: `Node ${idx + 1}`,
            target: `Node ${idx + 2}`,
        }));

        // If you want to add a link from the last node to the first one, you can do this:
        links.push({ source: 'Node 100', target: 'Node 1' });


        const categories = ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other'];

        return {
            legend: {
                data: categories,
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    animation: true,
                    label: {
                        position: 'right',
                        formatter: '{b}',
                    },
                    draggable: true,
                    data: nodes.map(function (node, idx) {
                        node.id = idx;
                        return node;
                    }),
                    categories: categories.map((name) => ({ name })),
                    force: {
                        edgeLength: 5,
                        repulsion: 20,
                        gravity: 0.2,
                    },
                    edges: links.map(link => ({
                        source: nodes.find(node => node.name === link.source).id,
                        target: nodes.find(node => node.name === link.target).id
                    })),
                },
            ],
        };
    };

    render() {
        return <ReactECharts option={this.getOption()} style={{height: '100%', width: '100%'}}/>;
    }
}
