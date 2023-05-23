import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useState } from "react";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import CategoryIcon from '@mui/icons-material/Category';
import Card from '../components/3DCard'
import BarChart from '../components/BarChart'
import TransitionChart from '../components/TransitionChart'
import RadarChart3d from '../components/RadarChart3d'
import ParallelChart from '../components/ParallelChart'
import MoneyArtistRace from '../components/MoneyArtistRace'
import Graph from '../components/Graph'

const inter = Inter({ subsets: ["latin"] });
const Page_1 = () => {
  const [selected, setSelected] = useState("Songs");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      className={`overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
    >
      <PageChanger currentPage="Going deeper" prevPage="page_1" nextPage="page_3" />


      <div className="flex h-[70vh] w-[80vw] flex-col flex-wrap md:flex-row justify-between md:space-x-4 md:flex-nowrap">
        <div className="md:w-1/4 md:max-w-[20rem] grow bg-white/40 rounded-lg mt-4 shadow-lg p-4">Left Column</div>
        <div className="md:w-3/4 grow md:max-w-[90rem] bg-white/40 rounded-lg mt-4 shadow-lg p-4">
            {/* <Graph/> */}
            <MoneyArtistRace/>
        </div>
      </div>
    </div>
  );
};

export default Page_1;
