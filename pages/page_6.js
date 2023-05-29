import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture';
import PageChanger from '../components/PageChanger';
import { Inter } from 'next/font/google'
import Card from '@/components/3DCard';
const inter = Inter({ subsets: ['latin'] })
import ReplayIcon from '@mui/icons-material/Replay';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
// This animation moves an element from top to bottom of its container
const fallAnimation = keyframes`
  0% { top: -5%; }
  100% { top: 105%; }
`;

// This is a styled component which will use the animation
const Dollar = styled.div`
  position: absolute;
  top: 0;
  animation: ${fallAnimation} 3s linear;
  animation-delay: ${props => props.delay}s;
  animation-iteration-count: infinite;
  left: ${props => props.left}%;
`;

const DollarRain = () => {
  const [dollars, setDollars] = useState([]);

  useEffect(() => {
    const newDollars = [];
    for (let i = 0; i < 100; i++) {
      newDollars.push({
        left: Math.random() * 100, // Random position from left
        delay: Math.random() * 5 // Random animation start delay
      });
    }
    setDollars(newDollars);
  }, []);



  const DraggableImage = ({ src }) => {
    const [props, api] = useSpring(() => ({
      x: 0,
      y: 0,
      scale: 1
    }))
    const bind = useDrag(({ event, active, movement: [x, y] }) => {
      // Prevents default on all devices and stop event propagation on touch devices
      event.preventDefault()
      if ('ontouchstart' in window) {
        event.stopPropagation()
      }

      api.start({
        x: active ? x : 0,
        y: active ? y : 0,
        scale: active ? 1.4 : 1,
        immediate: (k) => k !== 'scale' && active
      })
    })

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
      <animated.img
        src={src}
        {...bind()}
        style={props}
        className={"draggable-mobile cursor-grab active:cursor-grabbing animate-bounce hover:animate-spin active:animate-none"}
      />
    )
  }


  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {dollars.map((dollar, i) => (
        <Dollar key={i} left={dollar.left} delay={dollar.delay} className='text-xl z-[30]'>💸</Dollar>
      ))}

      <div className='absolute left-[50vw] top-6'>
      <Link href={`/`}>
        <IconButton>
          <ReplayIcon style={{ color: "#8439FE" }} />
        </IconButton>
        </Link>
      </div>

      <h1 className='absolute left-[50vw] top-[30rem] text-3xl text-white font-bold animate-spin hover:animate-bounce hover:text-6xl cursor-default'>
          MERCI
      </h1>
      <div className='absolute left-[16vw] md:left-[14vw] top-[13rem] max-w-[12rem] text-md p-1 bg-white/40 shadow-lg rounded-lg'>
        <p>Clémence Millet</p>
        <p>Stagiaire M1</p>
        <p>ESILV</p>
      </div>
      <div className='absolute left-[10vw] top-[10rem] max-w-[14rem] hover:z-40'>
        <Card>
          <DraggableImage src="/clemence_thug.png" />
        </Card>

      </div>

      <div className='absolute right-[9vw] md:right-[12vw] top-[18rem] text-md p-1 bg-white/40 shadow-lg rounded-lg'>
        <p>Jérémy Gourdeau</p>
        <p>Ex stagiaire</p>
        <p>Ex ESILV</p>
      </div>
      <div className='absolute right-[2vw] md:right-[10vw] top-[15rem] max-w-[12rem] z-20 hover:z-30'>
        <Card className='absolute z-20'>
          <DraggableImage src="/jeremy_thug.png" />
        </Card>


      </div>

    </div>
  );
}

export default DollarRain;
