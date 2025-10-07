// src/app/components/FilmMakers.tsx
"use client";

import { motion } from "framer-motion";
import FilmMakerCard from "./FilmMakerCard";

const makers = [
  {
    id: "adelle",
    name: "Adelle Onyango",
    imageSrc: "/adele_filmmaker_card.png",
    socialUrl: "https://www.instagram.com/adelleonyango/?hl=en",
    bgColor: "bg-[#7F3DFF]",
    pattern: "/pattern.png",
  },
  {
    id: "anthony",
    name: `Anthony 'Ty' Ngachira`,
    imageSrc: "/anthony_filmmaker_card.png",
    socialUrl: "https://www.instagram.com/anto_ty/?hl=en",
    bgColor: "bg-[#D81B60]",
    pattern: "/pattern.png",
  },
  {
    id: "abigael",
    name: "Abigael Arunga",
    imageSrc: "/abigael_filmmaker_card.png",
    socialUrl: "https://www.instagram.com/abigailarunga/?hl=en",
    bgColor: "bg-[#FF9800]",
    pattern: "/pattern.png",
  },
  {
    id: "lydia",
    name: "Lydia Matata",
    imageSrc: "/lydia_filmmaker_card.png",
    socialUrl: "https://www.instagram.com/lydiamatata/?hl=en",
    bgColor: "bg-[#009688]",
    pattern: "/pattern.png",
  },
];


const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      ease: "easeOut",
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function MeetFilMakers() {
  return (
    <div className="px-8 md:px-12 lg:px-28">
      <div className="max-w-[1200px] px-8 md:px-12 lg:px-28">
        <p className="font-gilroy text-xl md:text-2xl font-light text-center text-white">
          Through four captivating short films, we move beyond legalese and
          jargon to embrace a language that’s deeply personal, relatable, and
          rooted in our local history.
        </p>
        <p
          className="uppercase mt-10 text-4xl md:text-6xl font-bold font-myona text-center"
          style={{ fontFamily: "Myona-Sans" }}
        >
          Meet the Directors
        </p>
      </div>

      <div className="w-full">
        <motion.section
          className="px-4 sm:px-6 md:px-0 py-8 bg-transparent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          //@ts-ignore
          variants={containerVariants}
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              // @ts-ignore
              variants={containerVariants}
            >
              {makers.map((m) => (
                // @ts-ignore
                <motion.div key={m.id} variants={cardVariants}>
                  <FilmMakerCard {...m} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
