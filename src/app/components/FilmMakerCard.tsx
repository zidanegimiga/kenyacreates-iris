"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface FilmMakerCardProps {
  name: string;
  imageSrc: string;
  socialUrl: string;
  bgColor: string;
  pattern: string;
}

export default function FilmMakerCard({
  name,
  imageSrc,
  socialUrl,
  bgColor,
  pattern,
}: FilmMakerCardProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
<motion.div
  initial="rest"
  whileHover="hover"
  animate={isActive ? "hover" : "rest"}
  onClick={handleClick}
  className="group relative overflow-hidden cursor-pointer"
>
  <div className={`absolute inset-0`} />
  
  <div className="absolute inset-0 bg-cover bg-center">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(/pattern.png)`,
      }}
    />
    <motion.div 
      className="absolute inset-0 bg-[#954A01]"
      variants={{
        rest: { opacity: 0 },
        hover: { opacity: 0.9 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </div>

  {/* Image with grayscale and slide animation */}
  <motion.div
    variants={{
      rest: { y: 0, filter: "grayscale(0)" },
      hover: { y: 40, filter: "grayscale(100%)" },
    }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="relative z-10"
  >
    <Image
      src={imageSrc}
      alt={name}
      width={400}
      height={400}
      className="w-full h-[400px] object-cover"
      priority
    />
  </motion.div>

  {/* Name & Arrow: slide down into view */}
  <motion.div
    variants={{
      rest: { y: -20, opacity: 0 },
      hover: { y: 0, opacity: 1 },
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="absolute inset-0 z-20 flex items-start justify-between p-4"
  >
    <span className="text-white font-satoshi text-lg">{name}</span>
    <a
      target="_blank"
      href={socialUrl}
      rel="noopener noreferrer"
      aria-label={`Visit ${name}'s social`}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/60 transition"
      onClick={(e) => e.stopPropagation()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white -rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 7l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </a>
  </motion.div>
</motion.div>
  )
}
