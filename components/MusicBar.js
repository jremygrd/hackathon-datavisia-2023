import React, { useEffect, useRef } from 'react';

function MusicBar({ delay }) {
  const barRef = useRef();

  useEffect(() => {
    const barElement = barRef.current;

    const animation = barElement.animate(
      [
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(.2)' },
        { transform: 'scaleY(.8)' },
        { transform: 'scaleY(.5)' },
        { transform: 'scaleY(.9)' },
        { transform: 'scaleY(.4)' },
        { transform: 'scaleY(1)' }
      ], 
      {
        duration: 1000, // 1 second
        iterations: Infinity, // Repeat forever
        easing: 'ease-in-out', // Speed up and slow down
        delay: delay * 200 // delay based on prop
      }
    );

    return () => {
      animation.cancel();
    };
  }, [delay]);

  return (
    <div 
      ref={barRef} 
      style={{
        backgroundColor: 'white', 
        height: '100%', 
        width: '5px', 
        margin: '0 2px'
      }}
    />
  );
}

export default function Visualizer() {
  return (
    <div 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '12px'
      }}
    >
      <MusicBar delay={7} />
      <MusicBar delay={4} />
      <MusicBar delay={2} />
      <MusicBar delay={1} />
      <MusicBar delay={3} />
      <MusicBar delay={2} />
      <MusicBar delay={1} />
      <MusicBar delay={4} />
      <MusicBar delay={3} />
      <MusicBar delay={4} />
      
    </div>
  );
}
