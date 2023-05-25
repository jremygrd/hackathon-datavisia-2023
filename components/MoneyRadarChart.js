import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Papa from 'papaparse';
import axios from 'axios';

function MoneyRadarChart(selectedArtist) {
    const [moneyData, setMoneyData] = useState([]);
    useEffect(() => {
        axios.get('/data/hackathon_money_makers.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                results.data.pop()
                results.data.sort((a, b) => a.year - b.year);
                setMoneyData(results.data);
                }
            });
        });
    }, []);
    
    let minYear = Math.min(...moneyData.map(d => d.year));
    let maxYear = Math.max(...moneyData.map(d => d.year));
    

    var list = [];
    for (var a of moneyData) {
        if (!list.includes(a.year)) {
            list.push(a.year);
        }        
    }

    var option = {
    title: {
        text: "Artists' Money Sources",
        subtext: 'Per Year',
        top: 10,
        left: 10
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        type: 'scroll',
        bottom: 10,
        data: list,
        orient: 'vertical',
        left: 'left',        
    },
    radar: {
        indicator: [
            { text: 'Publishing', textStyle: {color: "white"} },
            { text: 'Sales+', textStyle: {color: "white"} },
            { text: 'Streaming', textStyle: {color: "white"} },
            { text: 'Touring', textStyle: {color: "white"} }
        ],
        name: {
            textStyle: {
              color: '#8439FE' // Change label color to white
            }
        }
    },
    series: (function () {
        var series = [];
        for (var a of moneyData) {
            if (a.Artist == selectedArtist.selectedArtist) {
                console.log(a);
                series.push({
                    type: 'radar',
                    symbol: 'none',
                    lineStyle: {
                    width: 1
                    },
                    emphasis: {
                        areaStyle: {
                            color: 'rgba(0,250,0,0.3)'
                        }
                    },
                    data: [
                    {
                        value: [
                        parseFloat(a.publishing),
                        parseFloat(a.sales),
                        parseFloat(a.streaming),
                        parseFloat(a.touring),
                        ],
                        name: a.year
                    }
                    ]
                })
            }            
        } 
        return series;           
    })()
    };
    return <ReactECharts option={option} notMerge={true}/>;
}

export default MoneyRadarChart;