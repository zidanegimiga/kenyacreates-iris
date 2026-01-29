// src/app/components/MeetFilMakers/index.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FilmMakerCard from "./FilmMakerCard";
import EditableText from "./cms/EditableText";
import EditableImage from "./cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";

type Maker = {
  id: string;
  name: string;
  imageSrc: string;
  socialUrl: string;
  bgColor: string;
  pattern: string;
};

type Data = {
  intro: string;
  title: string;
  makers: Maker[];
};

const defaultData: Data = {
  intro:
    "Through four captivating short films, we move beyond legalese and jargon to embrace a language that’s deeply personal, relatable, and rooted in our local history.",
  title: "Meet the Directors",
  makers: [
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
  ],
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7 } },
};

export default function MeetFilMakers() {
  const [data, setData] = useState<Data>(defaultData);
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
    // store page into state for use by save and Editable components
    setCurrentPage(page);

    const load = async () => {
      try {
        const res = await fetch(`/api/content/${page}/filmmakers`);
        if (res.ok) setData(await res.json());
      } catch {
        console.warn("Using default filmmakers");
      }
    };
    load();
    setIsCms(window.location.pathname.startsWith("/cms"));
  }, []);

  const save = (path: (string | number)[], value: any) => {
    setData((prev) => {
      const copy: any = JSON.parse(JSON.stringify(prev));
      let node = copy;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      node[path[path.length - 1]] = value;
      return copy;
    });
    add({ page: currentPage, section: "filmmakers", path, value });
  };

  return (
    <section className="relative overflow-hidden px-8 md:px-12 lg:px-28 py-20">
      <div className="relative z-10 text-center max-w-[1000px] mx-auto">
        {isCms ? (
          <EditableText
            page={currentPage}
            section="filmmakers"
            path={["intro"]}
            value={data.intro}
            onSave={(v) => save(["intro"], v)}
            onCancel={() => {}}
            className="font-gilroy text-xl md:text-2xl font-light text-white/90"
          >
            {data.intro}
          </EditableText>
        ) : (
          <motion.p
            className="font-gilroy text-xl md:text-2xl font-light text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data.intro}
          </motion.p>
        )}

        {isCms ? (
          <EditableText
            page={currentPage}
            section="filmmakers"
            path={["title"]}
            value={data.title}
            onSave={(v) => save(["title"], v)}
            onCancel={() => {}}
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-white tracking-wide"
            style={{ fontFamily: "Myona-Sans" }}
          >
            {data.title}
          </EditableText>
        ) : (
          <motion.h2
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-white tracking-wide"
            style={{ fontFamily: "Myona-Sans" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            {data.title}
          </motion.h2>
        )}
      </div>

      <motion.div
        className="relative z-10 mt-12 mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {data.makers.map((m, i) => (
            <motion.div
              key={m.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="hover:z-10"
            >
              {isCms ? (
                <div className="space-y-3">
                  <EditableImage
                    page={currentPage}
                    section="filmmakers"
                    path={["makers", i, "imageSrc"]}
                    src={m.imageSrc}
                    alt={m.name}
                    width={400}
                    height={600}
                    className="rounded-xl"
                    onSave={(v) => save(["makers", i, "imageSrc"], v)}
                    onCancel={() => {}}
                  />
                  <EditableText
                    page={currentPage}
                    section="filmmakers"
                    path={["makers", i, "name"]}
                    value={m.name}
                    onSave={(v) => save(["makers", i, "name"], v)}
                    onCancel={() => {}}
                    className="text-center font-bold text-white"
                  >
                    {m.name}
                  </EditableText>
                  <EditableText
                    page={currentPage}
                    section="filmmakers"
                    path={["makers", i, "socialUrl"]}
                    value={m.socialUrl}
                    onSave={(v) => save(["makers", i, "socialUrl"], v)}
                    onCancel={() => {}}
                    className="text-center text-sm text-white/80 underline"
                  >
                    {m.socialUrl}
                  </EditableText>
                </div>
              ) : (
                <FilmMakerCard {...m} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
