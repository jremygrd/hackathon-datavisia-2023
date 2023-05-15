import Link from "next/link";
import { motion } from "framer-motion";

const Links = ({selected}) => {
    return (
        <motion.div className="flex flex-row justify-between max-w-[60vw] space-x-8 m-2 pl-8 pr-8 backdrop-blur-lg bg-white/30 p-2 rounded-full">
        <Link href="/page_1">
          <h2 className={`mb-3 text-xl text-center font-semibold ${selected=="page_1" ? "bg-purple-500 px-4 text-white rounded-full":null} `}>
            Page 1
          </h2>
          <p className={`m-1 max-w-[30ch] text-sm text-center opacity-50`}>
            Music rocks
          </p>
          </Link>

          <Link href="/page_2">
          <h2 className={`mb-3 text-xl text-center font-semibold ${selected=="page_2" ? "bg-purple-500 px-4 text-white rounded-full":null} `}>
            Page 2
          </h2>
          <p className={`m-1 max-w-[30ch] text-sm text-center opacity-50`}>
            Music hits
          </p>
          </Link>

          <Link href="/page_3">
          <h2 className={`mb-3 text-xl text-center font-semibold ${selected=="page_3" ? "bg-purple-500 px-4 text-white rounded-full":null} `}>
            Page 3
          </h2>
          <p className={`m-1 max-w-[30ch] text-sm text-center opacity-50`}>
            Music hits
          </p>
          </Link>

          <Link href="/page_4">
          <h2 className={`mb-3 text-xl text-center font-semibold ${selected=="page_4" ? "bg-purple-500 px-4 text-white rounded-full":null} `}>
            Page 4
          </h2>

          <p className={`m-1 max-w-[30ch] text-sm text-center opacity-50`}>
            Music hits
          </p>
          </Link>
      </motion.div>
);
}

export default Links;
