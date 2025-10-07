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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function MeetFilMakers() {
  return (
    <section className="relative overflow-hidden px-8 md:px-12 lg:px-28 py-20">
      {/* Decorative Background Accent */}
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />

      {/* Intro Copy */}
      <div className="relative z-10 text-center max-w-[1000px] mx-auto">
        <motion.p
          className="font-gilroy text-xl md:text-2xl font-light text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Through four captivating short films, we move beyond legalese and
          jargon to embrace a language that’s deeply personal, relatable, and
          rooted in our local history.
        </motion.p>
        <motion.h2
          className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-white tracking-wide"
          style={{ fontFamily: "Myona-Sans" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Meet the Directors
        </motion.h2>
      </div>

      {/* Cards */}
      <motion.div
        className="relative z-10 mt-12 mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        // @ts-ignore
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          // @ts-ignore
          variants={containerVariants}
        >
          {makers.map((m) => (
            <motion.div
              key={m.id}
              // @ts-ignore
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="hover:z-10"
            >
              <FilmMakerCard {...m} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
