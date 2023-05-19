import Image from "next/image";
import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import BarGraph from "../components/bar_csv";
import PolarChart from "../components/polar";

const inter = Inter({ subsets: ["latin"] });
const Page_2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data/top10s.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

      const results = Papa.parse(csv, { header: true });
      setSongs(results.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const results = songs.filter(
      (song) =>
        (song.title &&
        song.title.toLowerCase().includes(searchTerm.toLowerCase()))
        ||
        (song.artist &&
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredSongs(results);
    console.log(results);
  }, [searchTerm, songs]);

  return (
    <div
      className={`flex min-h-[96vh] rounded-lg flex-col backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1w]${inter.className}`}
    >
      <PageChanger currentPage="Présentation" prevPage="page_2" nextPage={null} />
      <div class="flex h-[80vh] w-full">
        <div class="flex flex-col w-1/3">
          <div class="m-4 p-4 bg-red-200 rounded-lg flex-shrink">
          <input
            className="w-full px-3 py-2 text-gray-700 border-0 bg-transparent placeholder-gray-500 focus:outline-none"
            type="text"
            placeholder="Search for a song..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          <div class="m-4 p-4 bg-blue-200 rounded-lg flex-grow overflow-auto">
            <h3 class="text-lg font-semibold mb-2">Musiques</h3>
            <ul>
            {filteredSongs.map((song) => (
              <li onClick={()=>setSelectedSong(song)} key={song[""]} className={"p-1 rounded-lg bg-blue-100 mb-2 hover:bg-blue-600 hover:text-white hover:cursor-pointer"}>{song.title} - {song.artist}</li> // song[""] is the row number, we use it as ID
            ))}
          </ul>
          </div>
        </div>
        <div class="flex flex-col w-2/3">
          <div class="m-4 p-4 bg-purple-200 rounded-lg flex-grow overflow-hidden">
          <p className="mb-1">{selectedSong.title ? selectedSong.title:"Select a song"}</p>
          <p className="mb-6">{selectedSong.title ? selectedSong.artist:""}</p>
          <div className="h-[35rem] overflow-auto">
            {/* <BarGraph/> */}
            <PolarChart song={selectedSong} chartHeight={800}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page_2;
