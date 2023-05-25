import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import CategoryIcon from '@mui/icons-material/Category';
import Card from '../components/3DCard'
import BarChart from '../components/BarChart'
import TransitionChart from '../components/TransitionChart'
import RadarChart3d from '../components/RadarChart3d'
import ParallelChart from '../components/ParallelChart'
import MoneyArtistRace from '../components/MoneyArtistRace'
import MoneyRadarChart from '../components/MoneyRadarChart'
import Graph from '../components/Graph'
import { List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Papa from 'papaparse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ScrollableContainer = styled('div')({
  maxHeight: '300px',
  overflowY: 'auto',
});



const inter = Inter({ subsets: ["latin"] });
const Page_4 = () => {
  const [selected, setSelected] = useState("Songs");
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtists] = useState("Taylor Swift");
  useEffect(() => {
    axios.get('/data/hackathon_money_makers.csv').then(response => {
      Papa.parse(response.data, {
        header: true,
        complete: function (results) {
          results.data.pop()
          const listArtists = results.data.map(function (a) { return a["Artist"]; });
          setArtists([...new Set(listArtists)]);
        }
      });
    });
  }, []);

  return (
    <div
      className={`overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
    >
      <PageChanger currentPage="Money/Artist" prevPage="page_3" nextPage="page_5" />


      <div className="flex h-[40vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4 ">
          <div className="bg-white bg-opacity-50 rounded-full p-3 text-center">How much money did each genre make throughout the years ?</div>
        </div>
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4">
          {/* <Graph/> */}
          <MoneyArtistRace />
        </div>
      </div>
      <div className="flex h-[40vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4">
          <div>
            
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={artists}
              renderInput={(params) => <TextField {...params} label="Artist" color="secondary"/>}
              value={selectedArtist}
              onChange={(event, value) => setSelectedArtists(value)}
            />
            
          </div>
        </div>
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4">
          <MoneyRadarChart selectedArtist={selectedArtist} />
        </div>
      </div>
    </div>
  );
};

export default Page_4;
