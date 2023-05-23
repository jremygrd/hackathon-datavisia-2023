import React, { useState, useEffect } from "react";
import ReactEcharts from 'echarts-for-react';

function RadarChart({song_a, song_b, selected_top, selected_bottom}) {
    console.log(song_a, song_b)
    const [data, setData] = useState([]);
    const [legend, setLegend] = useState([]);

    useEffect(() => {
        if (song_a && song_b && (selected_bottom === selected_top) && (selected_top == 'Songs')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.name} - ${song_a.artist} - ${song_a.year}`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.name} - ${song_b.artist} - ${song_b.year}`
                }
            ]
            setData(data)
            setLegend([`${song_a.name} - ${song_a.artist} - ${song_a.year}`, `${song_b.name} - ${song_b.artist} - ${song_b.year}`])
        }

        if (song_a && song_b && (selected_bottom === 'Artists') && (selected_top == 'Songs')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.name} - ${song_a.artist} - ${song_a.year}`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`
                }
            ]
            setData(data)
            setLegend([`${song_a.name} - ${song_a.artist} - ${song_a.year}`,`${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`])
        }

        if (song_a && song_b && (selected_bottom === 'Songs') && (selected_top == 'Artists')){
            let data =  [
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                        , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.name} - ${song_b.artist} - ${song_b.year}`
                },
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                    , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                    name: `${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`
                }
            ]
            setData(data)
            setLegend([`${song_b.name} - ${song_b.artist} - ${song_b.year}`,`${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`])            
        }

        if (song_a && song_b && (selected_bottom === 'Artists') && (selected_top == 'Artists')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`
                }
            ]
            setData(data)
            setLegend([`${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`,`${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`])
        }


        if (song_a && song_b && (selected_bottom === 'Genres') && (selected_top == 'Genres')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.genre} - ${song_a.name} songs`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.genre} - ${song_b.name} songs`
                }
            ]
            setData(data)
            setLegend([`${song_a.genre} - ${song_a.name} songs`,`${song_b.genre} - ${song_b.name} songs`])
        }


        if (song_a && song_b &&  (selected_top == 'Genres') && (selected_bottom === 'Artists')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.genre} - ${song_a.name} songs`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`
                }
            ]
            setData(data)
            setLegend([`${song_a.genre} - ${song_a.name} songs`,`${song_b.artist} - ${song_b.year_min} - ${song_b.year_max}`])
        }

        if (song_a && song_b && (selected_top == 'Artists') && (selected_bottom === 'Genres') ){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.genre} - ${song_b.name} songs`
                }
            ]
            setData(data)
            setLegend([`${song_a.artist} - ${song_a.year_min} - ${song_a.year_max}`,`${song_b.genre} - ${song_b.name} songs`])
        }

        if (song_a && song_b && (selected_top == 'Songs') && (selected_bottom === 'Genres')){
            let data =  [
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                    , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                    name: `${song_a.name} - ${song_a.artist} - ${song_a.year}`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                        , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.genre} - ${song_b.name} songs`
                }
                
            ]
            setData(data)
            setLegend([`${song_a.name} - ${song_a.artist} - ${song_a.year}`,`${song_b.genre} - ${song_b.name} songs`])            
        }

        if (song_a && song_b && (selected_top == 'Genres') && (selected_bottom === 'Songs')){
            let data =  [
                
                {
                    value: [song_a.acousticness, song_a.danceability, song_a.duration_ms, song_a.energy, song_a.instrumentalness, song_a.liveness
                        , song_a.popularity, song_a.speechiness, song_a.tempo, song_a.valence],
                        name: `${song_a.genre} - ${song_a.name} songs`
                },
                {
                    value: [song_b.acousticness, song_b.danceability, song_b.duration_ms, song_b.energy, song_b.instrumentalness, song_b.liveness
                    , song_b.popularity, song_b.speechiness, song_b.tempo, song_b.valence],
                    name: `${song_b.name} - ${song_b.artist} - ${song_b.year}`
                }
            ]
            setData(data)
            setLegend([`${song_a.genre} - ${song_a.name} songs`,`${song_b.name} - ${song_b.artist} - ${song_b.year}`])
        }



    }, [song_a,song_b]);

    
                


    const getOption = () => {
        return {
            title: {
            },
            tooltip: {},
            legend: {
                data: legend,
            },
            radar: {
                // The shape can be 'circle', 'polygon'
                shape: 'polygon',
                name: {
                    textStyle: {
                        color: '#8439FE' // Change to the color you want
                    }
                },
                indicator: [
                    {name: 'acousticness'},
                    {name: 'danceability'},
                    {name: 'duration_ms'},
                    {name: 'energy'},
                    {name: 'instrumentalness'},
                    {name: 'liveness'},
                    {name: 'popularity'},
                    {name: 'speechiness'},
                    {name: 'tempo'},
                    {name: 'valence'},
                ]
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                data:data
                
            }]
        };
    }

    return (
        <ReactEcharts option={getOption()} style={{ height: '100%', width: '100%' }} />
    );
}

export default RadarChart;
