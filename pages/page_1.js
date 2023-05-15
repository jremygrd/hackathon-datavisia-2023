import Image from "next/image";
import { Inter } from "next/font/google";
import Links from "../components/Links";
import BarGraph from "../components/bar";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const Page_1 = () => {
  const [stateVariable, setStateVariable] = useState(false);
  return (
    <div
      className={`flex min-h-[96vh] rounded-lg flex-col backdrop-blur-lg bg-white/10 items-center my-[2vh] mx-[2vw] px-16 ${inter.className}`}
    >
      <Links selected={"page_1"} />

      <div className="flex items-stretch space-x-5 mt-16">
        <div className="p-6 rounded-lg backdrop-blur-xl bg-white/70 basis-2/3">
          <div
            className="flex items-center space-x-5 items-stretch h-full w-full"
            onClick={() => setStateVariable(!stateVariable)}
          >
            <div className="rounded-lg pl-8 w-[30vw]">
              <BarGraph
                chartHeight={290}
                chartWidth={210}
                test={stateVariable}
              />
            </div>

            <div className="flex flex-col items-center justify-between border-2 border-pink-500/20 rounded-lg p-2 w-[7rem] space-y-2 overflow-auto">
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                POP
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                R&B
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                TECH
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                AFRO
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                INDIE
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                TANGO
              </div>
              <div className="backdrop-blur-lg bg-black/30 cursor-pointer hover:bg-pink-500/30 rounded-full w-full text-center text-white">
                BRAVO
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page_1;
