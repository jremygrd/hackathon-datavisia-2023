import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture';
import PageChanger from '../components/PageChanger';
import { Inter } from 'next/font/google'
import Card from '@/components/3DCard';
const inter = Inter({ subsets: ['latin'] })
import Image from 'next/image'

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
      className={"draggable-mobile cursor-grab active:cursor-grabbing"}
    />
  )
}

export default function Home() {
  return (

    <main
      className={`shadow-lg flex min-h-[96vh] flex-col items-center pb-20  rounded-lg backdrop-blur-lg bg-white/10  my-[2vh] mx-[2vw]`}
    >

      <PageChanger currentPage="Présentation" prevPage={null} nextPage="page_1" />

      <div className='absolute left-[16vw] md:left-[14vw] top-[13rem] max-w-[12rem] text-md p-1 bg-white/40 shadow-lg rounded-lg'>
        <p>Clémence Millet</p>
        <p>Stagiaire M1</p>
        <p>ESILV</p>
      </div>
      <div className='absolute left-[10vw] top-[10rem] max-w-[14rem] hover:z-40'>
        <Card>
          <DraggableImage src="/clemence.png" />
        </Card>

      </div>
      <Image className='absolute top-[8rem] left-[10vw]'
        src={"/arrow_2.png"}
        width={50}
        height={50}
      />
      <div className='absolute top-[7rem] left-[8vw] indie-font text-lg'>
        Hello
      </div>

      <div className='absolute right-[9vw] md:right-[12vw] top-[18rem] text-md p-1 bg-white/40 shadow-lg rounded-lg'>
        <p>Jérémy Gourdeau</p>
        <p>Ex stagiaire</p>
        <p>Ex ESILV</p>
      </div>
      <div className='absolute right-[2vw] md:right-[10vw] top-[15rem] max-w-[12rem] z-20 hover:z-30'>
        <Card className='absolute z-20'>
          <DraggableImage src="/jeremy.png" />
        </Card>

       
      </div>
      <Image className='absolute top-[30rem] right-[2vw] md:right-[8vw]'
          src={"/arrow_1.png"}
          width={100}
          height={100}
        />
        <div className='absolute right-[2vw] md:right-[8vw] top-[36rem] indie-font text-lg'>
          Move me
        </div>

      <div className="hover:z-50 relative mt-72 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:rounded-full before:bg-gradient-radial before:from-transparent before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-transparent after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">

        <Card>
          <DraggableImage src="/team.png"/>
        </Card>

      </div>

    </main>
  )
}
