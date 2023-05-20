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
import Graph from '../components/Graph'

const inter = Inter({ subsets: ["latin"] });
const Page_1 = () => {
  const [selected, setSelected] = useState("Songs");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      className={`overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col max-h-[20rem] min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
    >
      <PageChanger currentPage="Présentation" prevPage="" nextPage="page_2" />



      <div className="flex flex-col w-[90vw] md:w-[70vw] lg:w-[60vw] md:flex-row md:space-x-4 ">
        <div className="w-full h-[20rem] md:h-auto md:w-2/3 bg-white/40 rounded-lg pt-8 mb-4 md:mb-0 relative  shadow-lg">

          <div className="flex flex-row absolute top-1 right-1 space-x-2">
            <div
              onClick={() => setSelected("Songs")}
              className={`px-4 rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
            ${selected === 'Songs' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
              Songs
            </div>
            <div onClick={() => setSelected("Artists")}
              className={`px-4 rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
            ${selected === 'Artists' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
              Artists
            </div>
            <div onClick={() => setSelected("Genres")}
              className={`px-4 rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
            ${selected === 'Genres' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
              Genres
            </div>
          </div>
          <BarChart />
          {/* <TransitionChart/> */}
          {/* <RadarChart3d/> */}
          {/* <ParallelChart/> */}
          {/* <Graph/> */}
        </div>

        <div className="flex flex-col w-full md:w-1/3 space-y-4 ">
          <Card>
            <div className="bg-white/40 p-8 relative rounded-lg shadow-lg">
              <div className="absolute top-1 right-2 text-xl font-bold text-custom-purple">
                Songs
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-3xl text-custom-purple">
                  4521
                </p>
                <p className="absolute right-1 top-8">
                  <MusicNoteIcon fontSize="large" style={{ color: "#8439FE" }} />
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="bg-white/40 p-8 relative rounded-lg shadow-lg">
              <div className="absolute top-1 right-2 text-xl font-bold text-custom-purple">
                Artists
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-3xl text-custom-purple">
                  836
                </p>
                <p className="absolute right-1 top-8">
                  <BrushIcon fontSize="large" style={{ color: "#8439FE" }} />
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="bg-white/40 p-8 relative rounded-lg shadow-lg">
              <div className="absolute top-1 right-2 text-xl font-bold text-custom-purple">
                Genres
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-3xl text-custom-purple">
                  41
                </p>
                <p className="absolute right-1 top-8">
                  <CategoryIcon fontSize="large" style={{ color: "#8439FE" }} />
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>

      <div className="flex flex-col bg-white/40 rounded-lg mt-4 shadow-lg p-4 w-[90vw] md:w-[70vw] lg:w-[60vw]">

        <div className="flex flex-wrap gap-y-2 md:gap-y-0 gap-x-[0.05rem] md:gap-x-4 justify-between items-center md:flex-row">
          <div
            onClick={() => setSelected("Songs")}
            className={`px-4 py-2 rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected === 'Songs' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
            Songs
          </div>
          <div onClick={() => setSelected("Artists")}
            className={`px-4 py-2  rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected === 'Artists' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
            Artists
          </div>
          <div onClick={() => setSelected("Genres")}
            className={`px-4 py-2  rounded-full text-sm font-bold hover:cursor-pointer ease-in duration-100 border border-custom-purple 
          ${selected === 'Genres' ? "hover:bg-custom-purple/90 bg-custom-purple text-white" : "text-custom-purple bg-white hover:bg-custom-purple hover:text-white"}`}>
            Genres
          </div>

          <div className="px-4 py-[0.4rem] grow bg-white border border-custom-purple rounded-full flex-shrink">
            <input
              className="w-full text-sm text-gray-700 border-0 bg-transparent placeholder-purple-300 focus:outline-none"
              type="text"
              placeholder="Search for a song or an artist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          
        </div>
        <div className="flex flex-row gap-x-4 overflow-x-auto p-4">
        <div className="transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
        <div className="h-40 w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative">
          <div className="flex flex-row space-x-2 items-center">
            <MusicNoteIcon fontSize="medium" style={{ color: "white" }} />
            <p className="text-white text-sm whitespace-nowrap overflow-auto">Come as you are</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <BrushIcon fontSize="medium" style={{ color: "white" }} />
            <p className="text-white text-sm">Nirvana</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <CategoryIcon fontSize="medium" style={{ color: "white" }} />
            <p className="text-white text-sm">Rock</p>
          </div>
            <div className="flex flex-row space-x-2 items-center overflow-x-auto custom-scrollbar">
              <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">80 bpm</p>
              <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">80 bpm</p>
              <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">80 bpm</p>
            </div>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Page_1;
