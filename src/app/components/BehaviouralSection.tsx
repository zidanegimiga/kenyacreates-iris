"use client";
import { motion } from "framer-motion";

export default function BehaviouralSection() {
  return (
    <div className="h-full bg-[#C22520] text-white w-full relative overflow-hidden pb-20">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C22520] via-[#A01A18] to-[#C22520] opacity-40"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="relative z-10 w-full px-8 md:px-16 py-20">
        <motion.h1
          className="text-4xl md:text-5xl font-light text-[#FFDCC8]"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Kenya Creates:
        </motion.h1>

        <motion.h1
          className="font-bold mb-6 text-4xl md:text-5xl text-[#FFDCC8] leading-tight"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Reimagining Behavioural Change Through Storytelling and Recognition
        </motion.h1>
      </div>

      {/* Grid Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {[
          {
            title: "A New Paradigm for Social Change",
            text: "The campaign was grounded in the belief that behavioral change begins with recognition, not instruction. When audiences see their realities reflected in honest, locally rooted narratives, they begin to question, talk, and reimagine what is possible.",
          },
          {
            title: "Storytelling as Intervention",
            text: "Kenya Creates positioned storytelling as an intervention rooted in recognition rather than instruction. Stories open emotional entry points. They offer language, reflect silences, and spark self-inquiry. The campaign’s Theory of Change was grounded in four shifts: reflection through storytelling, conversation through dialogue, connection through trusted intermediaries, and action through advocacy and tools. This approach recognized that engagement happens in layered spaces: homes, schools, churches, festivals, the media, and social media timelines.",
          },
          {
            title: "Navigating Digital Noise and Cultural Silences",
            text: "The urgency of this work is grounded in overlapping realities. Young Kenyans are surrounded by a fast-growing ecosystem of digital content that includes influencers, memes, hookup apps, and informal sex education. These voices offer a mix of empowerment, misinformation, moral judgment, and aspiration. At the same time, national conversations around SRHR remain framed by religious, cultural, and biomedical language, often leaving out the emotional and social contexts in which young people form their understanding of sex, consent, and self-worth. Formal sex education remains limited or inconsistent across the country.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className={`p-6 md:p-12 border border-white ${
              idx === 0
                ? "border-l-0 md:border-t md:border-b border-y-1"
                : idx === 1
                ? "border-y-1"
                : "border-r-0"
            }`}
            initial={{ y: 50, opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
            }}
            transition={{
              duration: 1,
              delay: idx * 0.4 + 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="text-lg md:text-xl font-light">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
