import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import HeatmapPop from '../components/HeatmapPopularity'

const inter = Inter({ subsets: ["latin"] });
const Page_5 = () => {
    /* const [songData, setSongData] = useState([]);

    useEffect(() => {
        axios.get('/data/songs_genre_exploded.csv').then(response => {
            Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                    setSongData(results.data);
                }
            });
        });
    }, []);   */

    
  return (
    <div className={`shadow-lg overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}>
        <PageChanger currentPage="Popularity by year and genre" prevPage="page_3" nextPage={"page_5"} />
        <div className="flex h-[60vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">        
          <div className="grow md:max-w-[90rem] bg-white/40 rounded-lg mt-20 shadow-lg p-4">
            <HeatmapPop/>          
          </div>
      </div>
      
    </div>
  );
};

export default Page_5;
