import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Papa from 'papaparse';
import axios from 'axios';

function isSubarray(subarray, array) {
    return array.some(arr => {
      return arr.every((element, index) => element === subarray[index]);
    });
}
function findSubarrayIndex(subarray, array) {
    for (let i = 0; i < array.length; i++) {
      const currentArray = array[i];
      if (currentArray.length === subarray.length && currentArray.every((element, index) => element === subarray[index])) {
        return i;
      }
    }
    return -1; // Subarray not found
}

function HeatmapPop() {

    const [songData, setSongData] = useState([]);

    useEffect(() => {
        axios.get('/data/songs_genre_exploded.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                    setSongData(results.data.filter(obj => 'genre' in obj));
                }
            });
        });
    }, []); 

    var option;

    var years = [];
    for (var a of songData) {
        if (!years.includes(a.year)) {
            years.push(a.year);
        }        
    }
    years.sort((a, b) => a - b);

    var genres = []
    for (var a of songData) {
        if (!genres.includes(a.genre)) {
            genres.push(a.genre);
        }        
    }

    var pop = [];
    var indexes = [];
    for (var a of songData) {
        const yearIndex = years.indexOf(a.year);
        const genreIndex = genres.indexOf(a.genre);
        if (!isSubarray([yearIndex, genreIndex], indexes)) {
            pop.push([yearIndex, genreIndex, a.popularity]);
            indexes.push([yearIndex, genreIndex]);
        }    
        else {
            var coupleIndex = findSubarrayIndex([yearIndex, genreIndex], indexes);
            pop[coupleIndex][2] = Math.round((parseInt(pop[coupleIndex][2]) + parseInt(a.popularity)) / 2) ;
        }
    }

    option = {
        title: {
            text: "Popularity per genre per year",
            top: 10,
            left: 10,
            textStyle: {
                color: '#8439FE',
            },
        },
        tooltip: {
            textStyle: {
                color: '#8439FE', 
            },
            borderColor: '#8439FE',
            position: 'top'
        },
        grid: {
            height: '80%', // Increase the height to accommodate all labels
            top: '15%', // Adjust the top position to center the heatmap
            left: '10%', // Adjust the left position to center the heatmap
            right: '10%' // Adjust the right position to center the heatmap
          },
        xAxis: {
            type: 'category',
            data: years,
            splitArea: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: '#8439FE'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: genres,
            splitArea: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: '#8439FE'
                }
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'vertical',
            left: 'right',
            bottom: '0%'
        },
        series: [
            {
            type: 'heatmap',
            data: pop,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
    };

    return <ReactECharts option={option} style={{height: '100%', width: '100%'}} />;

}

export default HeatmapPop;
