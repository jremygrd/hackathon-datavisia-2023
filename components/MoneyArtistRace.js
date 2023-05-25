import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

function LineRaceChart() {
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState([]);

      useEffect(() => {
        axios.get('/data/songs_genre_exploded.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                    const validData = results.data.filter(song => song["ID Artist"] && song.year && song.genre);
                    setSongData(validData);
                }
            });
        });
    }, []); 

    useEffect(() => {
        axios.get('/data/hackathon_money_makers.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                    const validData = results.data.filter(artist => artist["ID Artist"] && artist.total);
                    setArtistData(validData);
                }
            });
        });
    }, []); 

    var songDataMoney = [];
    songData.forEach(function(s) {
        artistData.forEach(function(a) {
            if (s["ID Artist"] === a["ID Artist"]) {
                s.money = a.total
                songDataMoney.push(s);
            }
        });
    });

    var genres = {};
    var years = [];
    songDataMoney.forEach(function(s) {
        if (!genres.hasOwnProperty(s.genre)) {
            genres[s.genre] = [[parseFloat(s.money), parseInt(s.year)]];
        }
        else {
            genres[s.genre].push([parseFloat(s.money), parseInt(s.year)]);
        }
        if (!years.includes(parseInt(s.year))) {
            years.push(parseInt(s.year));
        }
    })
    years.sort();

    var data = {}
    for (let g in genres) {
        data[g] = []        
        years.forEach(function(y) {
            var tot = 0
            genres[g].forEach(function(s) {
                if (s[1] == y) {
                    tot += s[0]
                }
            })
            data[g].push(tot)
        })
    }

    const genreColors = {
        'country': '#ffd700',
        'dance/electronic': '#ffff00',
        'folk/acoustic': '#d0320b',
        'hiphop': '#990000',
        'latin': '#ff0000',
        'metal' : '#F3A738',
        'pop' : '#EE7B30',
        'r&b' : '#F3D34A',
        'rock' : '#FABC2A',
        'world/traditional' : '#9B2915'
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
            data: Object.keys(data),
            show: false
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
            showSymbol: false,
            emphasis: {
                focus: 'series'
            },
            data: genreData,
            lineStyle: {
                color: genreColors[genre]
            },
            label: {
                show: false
            },
            endLabel: {
                show: true,
                formatter: function (params) {
                    return genre + ': ' + Math.round(genreData.reduce((partialSum, a) => partialSum + a, 0));
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
            style={{ height: '300px', width: '100%' }}
            className='react_for_echarts'
        />
    )
}

export default LineRaceChart;
