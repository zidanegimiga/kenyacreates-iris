// src/app/components/BehaviouralSection/index.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditableText from "./cms/EditableText";
import { useEditorStore } from "@/lib/useContent";

type Card = {
  title: string;
  text: string;
};

type BehaviouralData = {
  heading1: string;
  heading2: string;
  cards: Card[];
};

const defaultData: BehaviouralData = {
  heading1: "Kenya Creates:",
  heading2:
    "Reimagining Behavioural Change Through Storytelling and Recognition",
  cards: [
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
  ],
};

export default function BehaviouralSection() {
  const [data, setData] = useState<BehaviouralData>(defaultData);
  const [isCms, setIsCms] = useState(false);
  const { add } = useEditorStore();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const getPageFromPath = () => {
      if (typeof window === "undefined") return "kenyacreates";
      const parts = window.location.pathname.split("/").filter(Boolean);
      // if editing via /cms/editor, optionally check a query param ?page=kenyacreates, but fallback:
      if (parts[0] === "cms") {
        // you might put the page slug in query or default to kenyacreates for now
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("page") || "kenyacreates";
      }
      return parts[0] || "kenyacreates";
    };

    const page = getPageFromPath();
    setCurrentPage(page);

    const load = async () => {
      try {
        const res = await fetch(`/api/content/${page}/behavioural`);
        if (res.ok) setData(await res.json());
      } catch {
        console.warn("Using default behavioural");
      }
    };
    load();
    setIsCms(window.location.pathname.startsWith("/cms"));
  }, []);

  const saveText = (path: (string | number)[], value: string) => {
    setData((prev) => {
      const copy: any = JSON.parse(JSON.stringify(prev));
      let node = copy;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      node[path[path.length - 1]] = value;
      return copy;
    });

    add({
      page: currentPage,
      section: "behavioural",
      path,
      value,
    });
  };

  return (
    <div className="h-full bg-[#C22520] text-white w-full relative overflow-hidden pb-20">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C22520] via-[#A01A18] to-[#C22520] opacity-40"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="relative z-10 w-full px-8 md:px-16 py-20">
        {isCms ? (
          <EditableText
            page={currentPage}
            section="behavioural"
            path={["heading1"]}
            value={data.heading1}
            onSave={(v) => saveText(["heading1"], v)}
            onCancel={() => {}}
            className="text-4xl md:text-5xl font-light text-[#FFDCC8]"
          >
            {data.heading1}
          </EditableText>
        ) : (
          <motion.h1
            className="text-4xl md:text-5xl font-light text-[#FFDCC8]"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {data.heading1}
          </motion.h1>
        )}

        {isCms ? (
          <EditableText
            page={currentPage}
            section="behavioural"
            path={["heading2"]}
            value={data.heading2}
            onSave={(v) => saveText(["heading2"], v)}
            onCancel={() => {}}
            className="font-bold mb-6 text-4xl md:text-5xl text-[#FFDCC8] leading-tight"
          >
            {data.heading2}
          </EditableText>
        ) : (
          <motion.h1
            className="font-bold mb-6 text-4xl md:text-5xl text-[#FFDCC8] leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {data.heading2}
          </motion.h1>
        )}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {data.cards.map((card, idx) => (
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
            {isCms ? (
              <>
                <EditableText
                  page={currentPage}
                  section="behavioural"
                  path={["cards", idx, "title"]}
                  value={card.title}
                  onSave={(v) => saveText(["cards", idx, "title"], v)}
                  onCancel={() => {}}
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  {card.title}
                </EditableText>

                <EditableText
                  page={currentPage}
                  section="behavioural"
                  path={["cards", idx, "text"]}
                  value={card.text}
                  onSave={(v: string) => saveText(["cards", idx, "text"], v)}
                  onCancel={() => {}}
                  className="text-lg md:text-xl font-light"
                >
                  {card.text}
                </EditableText>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {card.title}
                </h2>
                <p className="text-lg md:text-xl font-light">{card.text}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
