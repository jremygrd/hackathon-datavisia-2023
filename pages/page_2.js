import Image from "next/image";
import { Inter } from "next/font/google";
import Links from "../components/Links";
import BarGraph from "../components/bar_csv";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const Page_2 = () => {
  const [stateVariable, setStateVariable] = useState(false);
  return (
    <div
      className={`flex min-h-[96vh] rounded-lg flex-col backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[2vw] px-16 ${inter.className}`}
    >
      <Links selected={"page_2"}/>

      <div className="p-6 rounded-lg backdrop-blur-xl bg-white/70 h-[19rem]">
        <div
          className="flex items-center justify-between space-x-5 items-stretch h-full"
          onClick={() => setStateVariable(!stateVariable)}
        >
          <div className="rounded-lg pl-8 w-[23rem]">
            <BarGraph chartHeight={290} chartWidth={90} test={stateVariable} />
          </div>

          <div className="flex flex-col items-center justify-between border-2 border-pink-500/20 rounded-lg p-2 w-[7rem] space-y-2 overflow-auto">

            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2023</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2022</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2021</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2020</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2019</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2018</div>
            <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">2017</div>

          </div>
        </div>
      </div>

      <div className="container m-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default Page_2;
