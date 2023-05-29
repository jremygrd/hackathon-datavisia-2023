import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Papa from 'papaparse';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import CategoryIcon from '@mui/icons-material/Category';
import Card from '../components/3DCard'
import BarChart from '../components/BarChart'
import TransitionChart from '../components/TransitionChart'
import RadarChart3d from '../components/RadarChart3d'
import ParallelChart from '../components/ParallelChart3'
import Graph from '../components/Graph'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import RadarChart from "@/components/RadarChart";
import ScatterChart from "@/components/ScatterChart";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const axis_ = [
    "acousticness",
    "danceability",
    "duration_ms",
    "energy",
    "instrumentalness",
    "key",
    "liveness",
    "loudness",
    "mode",
    "popularity",
    "speechiness",
    "tempo",
    "valence",
    "year"
]

const genres_ = [
    "pop", "rock"
]

const inter = Inter({ subsets: ["latin"] });
const Page_1 = () => {

    const [selected_top, setSelected_top] = useState("Songs");
    const [selected_bottom, setSelected_bottom] = useState("Songs");

    const [selectedSongTop, setSelectedSongTop] = useState(null);
    const [selectedSongBottom, setSelectedSongBottom] = useState(null);

    const [selected_x_axis, setselected_x_axis] = useState(null);
    const [selected_y_axis, setselected_y_axis] = useState(null);
    const [selected_z_axis, setselected_z_axis] = useState(null);


    const [data, setData] = useState([]);
    const [ArtistData, setArtistData] = useState([]);
    const [GenresData, setGenresData] = useState([]);
    const [distinctGenres, setDistinctGenresData] = useState([]);
    const [parallelData, setParallelData] = useState([]);
    const [selected_chart, setselected_chart] = useState("scatter");
    const [genreSelection, setGenreSelection] = React.useState(distinctGenres);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setGenreSelection(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    useEffect(() => {
        axios.get('/data/hackathon_song_normalize_no_duplicates.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function (results) {
                    const validData = results.data.filter(song => song.year && song.genre && song.name && song.artist);
                    setData(validData);
                }
            });
        });

        axios.get('/data/hackathon_song_normalize_artist_grouped.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function (results) {
                    const validDataArtist = results.data.filter(artist => artist.artist);
                    setArtistData(validDataArtist);
                }
            });
        });

        axios.get('/data/hackathon_song_normalize_genre_grouped.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function (results) {
                    const validDataGenres = results.data.filter(genre => genre.genre);
                    setGenresData(validDataGenres);
                    const distinctGenres = [...new Set(results.data.map(item => item.genre))].filter(Boolean);
                    setDistinctGenresData(distinctGenres)
                    setGenreSelection(distinctGenres)
                }
            });
        });


        axios.get('/data/hackathon_parallel_chart.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function (results) {
                    const validDataparallel = results.data.filter(genre => genre.genre);
                    setParallelData(validDataparallel);
                }
            });
        });



    }, []);

    return (
        <div
            className={`shadow-lg overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
        >
            <PageChanger currentPage="Compare" prevPage="page_1" nextPage="page_3" />


            <div className="flex h-[70vh] w-[80vw]  mt-4 flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap space-y-4 md:space-y-0">

                <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg shadow-lg p-4 flex flex-col gap-y-8 overflow-y-auto">
                    <h1 className="font-bold text-xl text-custom-purple">Compare</h1>


                    <div className="flex flex-wrap gap-y-2 md:gap-y-2 gap-x-[0.05rem] md:gap-x-4 justify-between items-center md:flex-row">
                        <div
                            onClick={() => { setSelected_top("Songs"); setSelectedSongTop(null); }}
                            className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected_top === 'Songs' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                            Songs
                        </div>
                        <div onClick={() => { setSelected_top("Artists"); setSelectedSongTop(null); }}
                            className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected_top === 'Artists' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                            Artists
                        </div>
                        <div onClick={() => { setSelected_top("Genres"); setSelectedSongTop(null); }}
                            className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected_top === 'Genres' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                            Genres
                        </div>
                        <div onClick={() => { setSelected_top("All"); setSelectedSongTop(null); }}
                            className={`px-2 py-2 grow text-center rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected_top === 'All' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                            All
                        </div>


                    </div>

                    {
                        selected_top == "Songs" ?
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={data ? data : []}
                                getOptionLabel={(option) => `${option.name} - ${option.artist}`}
                                renderInput={(params) => <TextField {...params} label="Song" color="secondary" />}
                                value={selectedSongTop}
                                onChange={(event, value) => setSelectedSongTop(value)}
                            />
                            : selected_top == "Artists" ?

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={ArtistData ? ArtistData : []}
                                    getOptionLabel={(option) => `${option.artist}`}
                                    renderInput={(params) => <TextField {...params} label="Artist" color="secondary" />}
                                    value={selectedSongTop}
                                    onChange={(event, value) => setSelectedSongTop(value)}
                                />
                                : selected_top == "Genres" ?

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={GenresData ? GenresData : []}
                                        getOptionLabel={(option) => `${option.genre}`}
                                        renderInput={(params) => <TextField {...params} label="Genre" color="secondary" />}
                                        value={selectedSongTop}
                                        onChange={(event, value) => setSelectedSongTop(value)}
                                    /> :
                                    selected_top == "All" ?

                                        null : null
                    }

                    {
                        selected_top !== "All" ?
                            <>


                                <h1 className="font-bold text-xl text-custom-purple">With</h1>


                                <div className="flex flex-wrap gap-y-2 md:gap-y-2 gap-x-[0.05rem] md:gap-x-4 justify-between items-center md:flex-row">
                                    <div
                                        onClick={() => { setSelected_bottom("Songs"); setSelectedSongBottom(null); }}
                                        className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selected_bottom === 'Songs' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                                        Songs
                                    </div>
                                    <div onClick={() => { setSelected_bottom("Artists"); setSelectedSongBottom(null); }}
                                        className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selected_bottom === 'Artists' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                                        Artists
                                    </div>
                                    <div onClick={() => { setSelected_bottom("Genres"); setSelectedSongBottom(null); }}
                                        className={`px-2 py-2 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selected_bottom === 'Genres' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
                                        Genres
                                    </div>




                                </div>
                                {
                                    selected_bottom == "Songs" ?
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={data ? data : []}
                                            getOptionLabel={(option) => `${option.name} - ${option.artist}`}
                                            renderInput={(params) => <TextField {...params} label="Song" color="secondary" />}
                                            value={selectedSongBottom}
                                            onChange={(event, value) => setSelectedSongBottom(value)}
                                        />
                                        :

                                        selected_bottom == "Artists" ?
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={ArtistData ? ArtistData : []}
                                                getOptionLabel={(option) => `${option.artist}`}
                                                renderInput={(params) => <TextField {...params} label="Artist" color="secondary" />}
                                                value={selectedSongBottom}
                                                onChange={(event, value) => setSelectedSongBottom(value)}
                                            />
                                            : selected_bottom == "Genres" ?
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={GenresData ? GenresData : []}
                                                    getOptionLabel={(option) => `${option.genre}`}
                                                    renderInput={(params) => <TextField {...params} label="Genre" color="secondary" />}
                                                    value={selectedSongBottom}
                                                    onChange={(event, value) => setSelectedSongBottom(value)}
                                                />
                                                : null
                                }
                            </> :

                            <>
                                <div className="flex flex-col w-full items-center">
                                    <div onClick={() => setselected_chart("parallel")}
                                        className={`px-2 py-2 w-full mt-6 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selected_chart === 'parallel' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}> Parallel Chart </div>

                                    <div onClick={() => setselected_chart("scatter")}
                                        className={`px-2 py-2 w-full mt-6 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selected_chart === 'scatter' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}> Scatter Plot </div>



                                    <Autocomplete
                                        className="w-full mt-6  "
                                        disablePortal
                                        id="combo-box-demo"
                                        options={axis_}
                                        getOptionLabel={(option) => `${option}`}
                                        renderInput={(params) => <TextField {...params} label="X-axis" color="secondary" />}
                                        value={selected_x_axis}
                                        onChange={(event, value) => setselected_x_axis(value)}
                                    />
                                    <Autocomplete
                                        className="w-full mt-2  "
                                        disablePortal
                                        id="combo-box-demo"
                                        options={axis_}
                                        getOptionLabel={(option) => `${option}`}
                                        renderInput={(params) => <TextField {...params} label="Y-axis" color="secondary" />}
                                        value={selected_y_axis}
                                        onChange={(event, value) => setselected_y_axis(value)}
                                    />
                                    <Autocomplete
                                        className="w-full mt-2  "
                                        disablePortal
                                        id="combo-box-demo"
                                        options={axis_}
                                        getOptionLabel={(option) => `${option}`}
                                        renderInput={(params) => <TextField {...params} label="Radius" color="secondary" />}
                                        value={selected_z_axis}
                                        onChange={(event, value) => setselected_z_axis(value)}
                                    />

                                    <div className="w-full mt-2">
                                        <FormControl fullWidth={true}>
                                            <InputLabel id="demo-multiple-checkbox-label" color="secondary">Genres</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={genreSelection}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Filtres" color="secondary"/>}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {distinctGenres.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={genreSelection.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                </div>
                            </>
                    }

                </div>

                <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg shadow-lg p-4">
                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            {
                                selected_top !== 'All' ?
                                    <RadarChart song_a={selectedSongTop} song_b={selectedSongBottom} selected_top={selected_top} selected_bottom={selected_bottom} />
                                    :
                                    selected_chart =='parallel'?
                                    <ParallelChart data = {parallelData}></ParallelChart>
                                    :
                                    <ScatterChart data={parallelData.filter(item => genreSelection.includes(item.genre))} x_axis={selected_x_axis} y_axis={selected_y_axis} width_axis={selected_z_axis} />
                            }


                        </div>

                        {/* <div className="flex-grow-0">
                        <RadarChart />
                        </div> */}

                    </div>



                </div>

            </div>
        </div>
    );
};



export default Page_1;
