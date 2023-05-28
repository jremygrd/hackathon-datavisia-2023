import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import SunBurst from '../components/sunBurst';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import IconButton from '@mui/material/IconButton';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Graph from '../components/Graph'

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
    <div className={`overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}>
      <PageChanger currentPage="Awards winners" prevPage="page_5" nextPage={null} />

      <div className="flex h-[60vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4 ">

          



        </div>
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4 relative">
          <Graph />

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
