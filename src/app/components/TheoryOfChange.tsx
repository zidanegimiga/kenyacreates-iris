"use client";
import { motion } from "framer-motion";

export default function TheoryOfChange() {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-stretch overflow-hidden">
      {/* Left Image Panel */}
      <motion.div
        className="w-full lg:w-1/2 bg-[url('/theoryofchange.jpg')] bg-cover bg-center relative grayscale hover:grayscale-0 h-[70vh] lg:h-screen"
        initial={{ opacity: 0, scale: 1.2, x: -80 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.p
          className="font-bold text-sm md:text-lg absolute bottom-2 md:bottom-10 left-2 md:left-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Photo credit: Home by Adelle Onyango Behind the Scenes
        </motion.p>
      </motion.div>

      {/* Right Text Panel */}
      <div className="w-full lg:w-1/2 flex flex-col lg:h-screen">
        {/* Top Block */}
        <motion.div
          className="w-full bg-[#FF6E19] p-4 md:p-14 lg:h-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-2xl md:text-4xl font-bold"
            style={{ fontFamily: "Myona-Sans" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Theory of Change: The Power of Storytelling Shapes Culture
          </motion.p>
          <motion.p
            className="text-base md:text-xl font-light mt-2 md:mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Kenya Creates was anchored in the understanding that behavior change
            in the SRHR space does not begin with information alone. It begins
            with recognition. When individuals, especially young people, see
            themselves reflected in complex, culturally attuned stories, they
            begin to engage differently. They reflect, question, share, and in
            some cases, reimagine what is possible. This campaign positioned
            storytelling as a civic and emotional access point to shift
            perceptions, foster dialogue, and strengthen demand for accurate,
            inclusive, and affirming SRHR information and services.
          </motion.p>
        </motion.div>

        {/* Bottom Block */}
        <motion.div
          className="w-full bg-[#3A7E53] p-4 md:p-14 lg:h-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-base md:text-xl font-light w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            The theory of change acknowledged the diverse environments where
            these stories would land: homes, classrooms, festivals, and social
            media feeds. Each space carries different norms and framings, shaped
            by moral, cultural, medical, and legal traditions. In Kenya, these
            framings often overlap. Religious discourse prescribes chastity,
            cultural norms frame sex as taboo, and biomedical knowledge remains
            technical and distant from lived experience. SRHR rights are
            protected in policy but continue to face resistance when interpreted
            as foreign or disruptive to established values.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
