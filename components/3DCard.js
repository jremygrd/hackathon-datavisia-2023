import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Card = ({children}) => {
  const [style, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 4, tension: 450, friction: 20 } }));

  return (
    <animated.div
      className=""
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: style.xys.interpolate((x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`),
      }}
    >
      {children}
    </animated.div>
  );
}

function calc(x, y) {
  return [
    -(y - window.innerHeight / 2) / 80,
    -(x - window.innerWidth / 2) / 40,
    1.05,
  ];
}

export default Card;
