import { Inter } from "next/font/google";
import PageChanger from '../components/PageChanger';
import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import Papa from 'papaparse';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import CategoryIcon from '@mui/icons-material/Category';
import Card from '../components/3DCard';
import BarChartSongs from '../components/BarChartSongs';
import BarChartGenres from '../components/BarChartGenres';
import BarChartGenresScatter from '../components/BarChartGenresScatter';
import TransitionChart from '../components/TransitionChart'
import RadarChart3d from '../components/RadarChart3d'
import ParallelChart from '../components/ParallelChart'
import Graph from '../components/Graph'
import ZoomBarChart from '../components/zoomBarChart'
import PieGenres from '../components/pieGenres'
import GroupsIcon from '@mui/icons-material/Groups';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import ExplicitIcon from '@mui/icons-material/Explicit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { generateBuildId } from "@/next.config";
import ReactCountryFlag from 'react-country-flag';
import DateRangeIcon from '@mui/icons-material/DateRange';
import IconButton from '@mui/material/IconButton';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { animate } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
const Page_1 = () => {
  const [selected, setSelected] = useState("Songs");
  const [searchTerm, setSearchTerm] = useState("");
  const [wand, setWand] = useState(true);


  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);

  const [selectedSong, setSelectedSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [artistsData, setArtistData] = useState([]);
  const [GenresData, setGenresData] = useState([]);
  const [isClient, setIsClient] = useState(false); // add this line
  const [isClientArtist, setIsClientArtist] = useState(false); // add this line
  const [isClientGenres, setIsClientGenres] = useState(false); // add this line

  const props = useSpring({
    number: songData.length,
    from: { number: 0 },
    config: { duration: 1600 },
  });

  const propsArtists = useSpring({
    number: artistsData.length,
    from: { number: 0 },
    config: { duration: 1000 },
  });

  const propsGenres = useSpring({
    number: GenresData.length,
    from: { number: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    setIsClient(true);
    axios.get('/data/hackathon_songs_merge_artist.csv').then(response => {
      Papa.parse(response.data, {
        header: true,
        complete: function (results) {
          const validData = results.data.filter(song => song.name && song.year);
          setSongData(validData);
        }
      });
    });


    axios.get('/data/artists_infos_musics.csv').then(response => {
      setIsClientArtist(true);
      Papa.parse(response.data, {
        header: true,
        complete: function (results) {
          const validDataArtist = results.data.filter(artist => artist.artist);
          setArtistData(validDataArtist);
        }
      });
    });

    axios.get('/data/hackathon_song_normalize_genre_grouped.csv').then(response => {
      setIsClientGenres(true);
      Papa.parse(response.data, {
        header: true,
        complete: function (results) {
          const validDataGenres = results.data.filter(genre => genre.genre);
          setGenresData(validDataGenres);
          // console.log(validDataGenres)
        }
      });
    });

  }, []);



  useEffect(() => {
    if (artistsData) {
      const results = artistsData.filter(
        (artist) =>
        (artist.artist &&
          artist.artist.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredArtists(results);
    }
  }, [searchTerm, artistsData]);


  useEffect(() => {
    if (GenresData) {
      const results = GenresData.filter(
        (artist) =>
        (artist.genre &&
          artist.genre.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredGenres(results);
    }
  }, [searchTerm, GenresData]);

  useEffect(() => {
    if (songData) {
      const results = songData.filter(
        (song) =>
          (song.name &&
            song.name.toLowerCase().includes(searchTerm.toLowerCase()))
          ||
          (song.artist &&
            song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredSongs(results);
    }
  }, [searchTerm, songData]);

  function formatDuration(duration_ms) {
    // Convert duration to seconds
    const total_seconds = Math.floor(duration_ms / 1000);

    // Get minutes and seconds
    const minutes = Math.floor(total_seconds / 60);
    const seconds = total_seconds % 60;

    // Return formatted string
    return `${minutes}min ${seconds < 10 ? '0' : ''}${seconds}s`;
  }

  function formatBPM(tempo) {
    let bpm = Math.round(tempo);
    return `${bpm} BPM`;

  }

  function countryCodeToFlagEmoji(countryCode) {
    if (!countryCode) return ''; // handle undefined or null

    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
  }


  return (
    <div
      className={`shadow-lg overflow-y-auto hide-scrollbar overflow-x-hidden flex flex-col max-h-[20rem] min-h-[96vh] rounded-lg backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[1vw] ${inter.className}`}
    >
      <PageChanger currentPage="Explore" prevPage="" nextPage="page_2" />



      <div className="flex flex-col w-[90vw] md:w-[70vw] lg:w-[60vw] md:flex-row md:space-x-4 ">
        <div className="w-full h-[20rem] md:h-auto md:w-2/3 bg-white/40 rounded-lg pt-8 mb-4 md:mb-0 relative  shadow-lg">
          {
            selected === 'Songs' ?
              <div className="absolute right-1 bottom-1 z-40">
                <IconButton onClick={() => setWand(!wand)}>
                  <AutoFixHighIcon style={{ color: "#8439FE" }} />
                </IconButton>
              </div>
              : null
          }

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
          {
            selected == 'Songs' ?
              wand ?
                <BarChartSongs />
                :
                <BarChartGenres />
              :
              selected == 'Artists' ?
                <ZoomBarChart artistData={artistsData} />
                :
                selected == 'Genres' ?
                  <PieGenres genreData={GenresData} />
                  : null
          }

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
                  {songData ? isClient ?
                    <animated.div>
                      {props.number.to(n => n.toFixed(0))}
                    </animated.div>
                    : 0 : 0}
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
                  {artistsData ? isClientArtist ?
                    <animated.div>
                      {propsArtists.number.to(n => n.toFixed(0))}
                    </animated.div>
                    : 0 : 0}
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
                  {GenresData ? isClientArtist ?
                    <animated.div>
                      {propsGenres.number.to(n => n.toFixed(0))}
                    </animated.div>
                    : 0 : 0}
                </p>
                <p className="absolute right-1 top-8">
                  <CategoryIcon fontSize="large" style={{ color: "#8439FE" }} />
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>

      <div className="flex flex-col bg-white/40 rounded-lg mt-4 shadow-lg p-4 w-[90vw] md:w-[70vw] lg:w-[60vw] relative">
        {
          selected === 'Songs' ?

            <p className="absolute bottom-3 right-5 text-sm font-bold text-custom-purple">
              Showing {filteredSongs.length} songs
            </p>
            : selected == 'Artists' ?
              <p className="absolute bottom-3 right-5 text-sm font-bold text-custom-purple">
                Showing {filteredArtists.length} artists
              </p> :
              selected == "Genres" ?
                <p className="absolute bottom-3 right-5 text-sm font-bold text-custom-purple">
                  Showing {filteredGenres.length} genres
                </p>
                : null
        }

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

          {
            selected === 'Songs' ?

              <div className="px-4 py-[0.4rem] grow bg-white border border-custom-purple rounded-full flex-shrink">
                <input
                  className="w-full text-sm text-gray-700 border-0 bg-transparent placeholder-purple-300 focus:outline-none"
                  type="text"
                  placeholder="Search for a song or an artist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              :
              selected === "Artists" ?
                <div className="px-4 py-[0.4rem] grow bg-white border border-custom-purple rounded-full flex-shrink">
                  <input
                    className="w-full text-sm text-gray-700 border-0 bg-transparent placeholder-purple-300 focus:outline-none"
                    type="text"
                    placeholder="Search for an artist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                : selected === "Genres" ?
                  <div className="px-4 py-[0.4rem] grow bg-white border border-custom-purple rounded-full flex-shrink">
                    <input
                      className="w-full text-sm text-gray-700 border-0 bg-transparent placeholder-purple-300 focus:outline-none"
                      type="text"
                      placeholder="Search for a genre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div> : null
          }


        </div>
        <div className="flex flex-row gap-x-4 overflow-x-auto p-4">
          {
            selected === "Songs" ?
              <>

                {filteredSongs ? filteredSongs.slice(0, 100).map((song, index) => (
                  <div key={index} className="transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
                    <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                      {
                        song.explicit == "True" ?
                          <ExplicitIcon className="absolute bottom-2 right-2" style={{ color: "white" }} /> : null
                      }
                      <div className="flex flex-row space-x-2 items-center">
                        <MusicNoteIcon fontSize="medium" style={{ color: "white" }} />
                        <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar font-bold">{song.name}</p>
                      </div>
                      <div className="flex flex-row space-x-2 items-center">
                        {
                          song.type == "person" ?
                            song.gender == "female" ?
                              <Face3Icon fontSize="medium" style={{ color: "white" }} />
                              :
                              song.gender == "male" ?
                                <FaceIcon fontSize="medium" style={{ color: "white" }} />
                                :
                                <Face6Icon fontSize="medium" style={{ color: "white" }} />
                            : song.type == "group" ?
                              <GroupsIcon fontSize="medium" style={{ color: "white" }} /> :
                              <Face6Icon fontSize="medium" style={{ color: "white" }} />
                        }

                        <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.artist}</p>
                      </div>
                      <div className="flex flex-row space-x-2 items-center">
                        <CategoryIcon fontSize="medium" style={{ color: "white" }} />
                        <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.genre}</p>
                      </div>
                      <div className="flex flex-row flex-wrap gap-y-2 gap-x-2 overflow-y-auto items-center custom-scrollbar mt-2">
                        <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatDuration(song.duration_ms)}</p>
                        <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatBPM(song.tempo)}</p>
                      </div>
                    </div>
                  </div>
                )) :
                  <>
                    <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                      {/* Loading... */}
                    </div>
                    <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                    </div>
                    <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                    </div>
                    <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                    </div>
                  </>
                }
              </>


              :

              selected === "Artists" ?

                <>
                  {filteredArtists ? filteredArtists.slice(0, 100).map((song, index) => (
                    <div key={index} className="transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
                      <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                        {
                          song.explicit == "True" ?
                            <ExplicitIcon className="absolute bottom-2 right-2" style={{ color: "white" }} /> : null
                        }

                        <div className="flex flex-row space-x-2 items-center">
                          {
                            song.type == "person" ?
                              song.gender == "female" ?
                                <Face3Icon fontSize="medium" style={{ color: "white" }} />
                                :
                                song.gender == "male" ?
                                  <FaceIcon fontSize="medium" style={{ color: "white" }} />
                                  :
                                  <Face6Icon fontSize="medium" style={{ color: "white" }} />
                              : song.type == "group" ?
                                <GroupsIcon fontSize="medium" style={{ color: "white" }} /> :
                                <Face6Icon fontSize="medium" style={{ color: "white" }} />
                          }

                          <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar font-bold">{song.artist} {song.age ? ` - ${Math.round(song.age)} yo` : null}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center">
                          <MusicNoteIcon fontSize="medium" style={{ color: "white" }} />
                          <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.name} songs</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center">
                          <CategoryIcon fontSize="medium" style={{ color: "white" }} />
                          <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.genre}</p>
                        </div>

                        {
                          song.country ?
                            <div className="absolute -top-6 space-x-2 mt-1 items-center">
                              {
                                song.country ?
                                  <ReactCountryFlag
                                    countryCode={song.country}
                                    svg
                                    style={{
                                      width: '1.3em',
                                      height: '1em',
                                    }}
                                  /> : 'No country provided'}
                              {/* <CategoryIcon fontSize="medium" style={{ color: "white" }} /> */}
                            </div> : null
                        }

                        {
                          song['Total Awards'] > 0 ?
                            <div className="flex flex-row space-x-2 items-center">
                              <EmojiEventsIcon fontSize="medium" style={{ color: "white" }} />
                              <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{Math.round(song['Total Awards'])} Awards</p>
                            </div> : null
                        }


                        <div className="flex flex-row flex-wrap gap-y-2 gap-x-2 overflow-y-auto items-center custom-scrollbar mt-2">
                          {/* <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatDuration(song.duration_ms)}</p>
                          <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatBPM(song.tempo)}</p> */}
                        </div>
                      </div>
                    </div>
                  )) :
                    <>
                      <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                        {/* Loading... */}
                      </div>
                      <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                      </div>
                      <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                      </div>
                      <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                      </div>
                    </>
                  }
                </>
                :




                selected === "Genres" ?

                  <>
                    {filteredGenres ? filteredGenres.slice(0, 100).map((song, index) => (
                      <div key={index} className="transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
                        <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">

                          <div className="flex flex-row space-x-2 items-center">
                            <CategoryIcon fontSize="medium" style={{ color: "white" }} />
                            <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar font-bold">{song.genre}</p>
                          </div>
                          <div className="flex flex-row space-x-2 items-center">
                            <MusicNoteIcon fontSize="medium" style={{ color: "white" }} />
                            <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.name} songs</p>
                          </div>
                          <div className="flex flex-row space-x-2 items-center">
                            <DateRangeIcon fontSize="medium" style={{ color: "white" }} />
                            <p className="text-white text-sm whitespace-nowrap overflow-auto hide-scrollbar">{song.year_min} - {song.year_max}</p>
                          </div>



                          <div className="flex flex-row flex-wrap gap-y-2 gap-x-2 overflow-y-auto items-center custom-scrollbar mt-2">
                            {/* <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatDuration(song.duration_ms)}</p>
                          <p className="bg-white font-bold px-2 rounded-full text-custom-purple text-sm whitespace-nowrap">{formatBPM(song.tempo)}</p> */}
                          </div>
                        </div>
                      </div>
                    )) :
                      <>
                        <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                          {/* Loading... */}
                        </div>
                        <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                        </div>
                        <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                        </div>
                        <div className="h-[12rem] w-[12rem] bg-custom-purple/50 rounded-lg mt-4 p-2 flex flex-col gap-y-2 relative shadow-md">
                        </div>
                      </>
                    }
                  </> : null




          }



        </div>
      </div>
    </div>
  );
};

export default Page_1;
