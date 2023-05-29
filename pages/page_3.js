import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useEffect, useState } from 'react';
import MoneyArtistRace from '../components/MoneyArtistRace'
import MoneyRadarChart from '../components/MoneyRadarChart'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Papa from 'papaparse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '../components/3DCard';

const ScrollableContainer = styled('div')({
  maxHeight: '300px',
  overflowY: 'auto',
});



const inter = Inter({ subsets: ["latin"] });
const Page_4 = () => {
  const [selected, setSelected] = useState("Songs");
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtists] = useState("");
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
      className={`shadow-lg overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
    >
      <PageChanger currentPage="Money Money Money" prevPage="page_2" nextPage="page_4" />


      <div className="flex h-[40vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4 ">
          <Card>
          <div className="bg-white bg-opacity-50 rounded-lg p-3 text-center text-custom-purple font-bold cursor-default">How much money did each genre make throughout the years ?</div>
          </Card>


        </div>
        
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4">
          {/* <Graph/> */}
          <MoneyArtistRace />
        </div>
      </div>
      <div className="flex h-[40vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4 text-2xl text-custom-purple">
          <h1 className="font-bold text-xl text-custom-purple">Select an artist !</h1>
          <div className="mt-5">            
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
