import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import SunBurst from '../components/sunBurst';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import IconButton from '@mui/material/IconButton';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import styled, { keyframes } from 'styled-components';

const inter = Inter({ subsets: ["latin"] });
const Page_5 = () => {
  const [trigger, setTrigger] = useState(true);
  const [songData, setSongData] = useState([]);
  const [selectedAward, setSelectedAward] = useState("Total Awards");
  const [wand, setWand] = useState(true);

  useEffect(() => {
    axios.get('/data/artists_nominations_genres_chatgpt.csv').then(response => {
      Papa.parse(response.data, {
        header: true,
        complete: function (results) {
          const validData = results.data.filter(row => row.Artist);
          setSongData(validData);
        }
      });
    });
  }, []);


  return (
    <div className={`shadow-lg overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}>
      <PageChanger currentPage="Awards winners" prevPage="page_4" nextPage='page_6' />

      <div className="flex h-[60vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4 ">

          <div className="flex flex-col w-full items-center">
            <div onClick={() => setSelectedAward("Total Awards")}
              className={`px-2 py-2 w-full mt-6 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selectedAward === 'Total Awards' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}> Total Awards </div>

            <div onClick={() => setSelectedAward("Total Nominations")}
              className={`px-2 py-2 w-full mt-6 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selectedAward === 'Total Nominations' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}> Total Nominations </div>


            <div onClick={() => setSelectedAward("UK number 1's")}
              className={`px-2 py-2 w-full mt-6 text-center grow rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
${selectedAward === "UK number 1's" ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}> Total UK number 1's </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <h2 className="font-bold text-custom-purple mb-2">Top 5 artists</h2>
            {songData.sort((a, b) => b[selectedAward] - a[selectedAward]).slice(0,5).map((name) => (
              <div key={name.Artist} className="flex flex-row cursor-default justify-between items-center gap-x-2 transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
                <p  className="rounded-lg text-custom-purple  hover:bg-white bg-white/40 p-2 w-full overflow-auto  whitespace-nowrap hide-scrollbar">{name.Artist}</p>
                <p className="rounded-lg text-custom-purple bg-yellow-200 hover:bg-yellow-100 p-2">{name[selectedAward]}</p>
              </div>
            ))}
          </div>



        </div>
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4 relative">
          <SunBurst trigger={trigger} data={songData} awards_key={selectedAward} />

          <div className="absolute top-2 right-2">
            <IconButton onClick={() => setTrigger(!trigger)}>
              <AutoFixHighIcon style={{ color: "#8439FE" }} />
            </IconButton>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page_5;
