import React from 'react';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Link from 'next/link';
import Visualizer from './MusicBar';

export default function PageChanger({ currentPage, prevPage, nextPage }) {
    const [isDisabledPrev, setIsDisabledPrev] = React.useState(prevPage == null); // or some other condition
    const [isDisabledNext, setIsDisabledNext] = React.useState(nextPage == null); // or some other condition
    
    return (
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-full p-4 px-10 mt-2 mb-8 relative shadow-lg">
            <div className="flex items-center justify-between w-full">
                {
                    isDisabledPrev ?
                        <IconButton disabled>
                            <SkipPreviousIcon style={{ color: "gray" }} />
                        </IconButton>
                        :
                        <Link href={`/${prevPage}`}>
                            <IconButton>
                                <SkipPreviousIcon style={{ color: "white" }} />
                            </IconButton>
                        </Link>
                }
                <div className="text-center text-white">
                    <p>Currently listening</p>
                    <h2 className="font-bold">{currentPage}</h2>
                </div>
                {
                    isDisabledNext ?
                        <IconButton disabled>
                            <SkipNextIcon style={{ color: "gray" }} />
                        </IconButton>
                        :
                        <Link href={`/${nextPage}`}>
                            <IconButton>
                                <SkipNextIcon style={{ color: "white" }} />
                            </IconButton>
                        </Link>
                }
            </div>
            <div className="mt-2 w-full bottom-1">
                <Visualizer />
            </div>
        </div>
    );
}
