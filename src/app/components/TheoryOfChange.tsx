// src/app/components/TheoryOfChange/index.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import EditableText from "./cms/EditableText";
import EditableImage from "./cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";

type TheoryData = {
  image: string;
  photoCredit: string;
  title: string;
  firstParagraph: string;
  secondParagraph: string;
};

const defaultData: TheoryData = {
  image: "/theoryofchange.jpg",
  photoCredit: "Photo credit: Home by Adelle Onyango Behind the Scenes",
  title: "Theory of Change: The Power of Storytelling Shapes Culture",
  firstParagraph:
    "Kenya Creates was anchored in the understanding that behavior change in the SRHR space does not begin with information alone. It begins with recognition. When individuals, especially young people, see themselves reflected in complex, culturally attuned stories, they begin to engage differently. They reflect, question, share, and in some cases, reimagine what is possible. This campaign positioned storytelling as a civic and emotional access point to shift perceptions, foster dialogue, and strengthen demand for accurate, inclusive, and affirming SRHR information and services.",
  secondParagraph:
    "The theory of change acknowledged the diverse environments where these stories would land: homes, classrooms, festivals, and social media feeds. Each space carries different norms and framings, shaped by moral, cultural, medical, and legal traditions. In Kenya, these framings often overlap. Religious discourse prescribes chastity, cultural norms frame sex as taboo, and biomedical knowledge remains technical and distant from lived experience. SRHR rights are protected in policy but continue to face resistance when interpreted as foreign or disruptive to established values.",
};

export default function TheoryOfChange() {
  const [data, setData] = useState<TheoryData>(defaultData);
  const [isCms, setIsCms] = useState(false);
  const { add } = useEditorStore();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const getPageFromPath = () => {
      if (typeof window === "undefined") return "kenyacreates";
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts[0] === "cms") {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("page") || "kenyacreates";
      }
      return parts[0] || "kenyacreates";
    };

    const page = getPageFromPath();
    setCurrentPage(page);

    const load = async () => {
      try {
        const res = await fetch(`/api/content/${page}/theoryofchange`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.warn("Failed to load theoryofchange content, using defaults");
      }
    };
    load();
    setIsCms(window.location.pathname.startsWith("/cms"));
  }, []);

  const handleTextSave = (path: (string | number)[], newValue: string) => {
    setData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let node = newData;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      node[path[path.length - 1]] = newValue;
      return newData;
    });
    add({
      page: currentPage,
      section: "theoryofchange",
      path,
      value: newValue,
    });
  };

  const handleImageSave = (path: (string | number)[], newUrl: string) => {
    setData((prev) => ({ ...prev, image: newUrl }));
    add({ page: currentPage, section: "theoryofchange", path, value: newUrl });
  };

  const handleCancel = () => {};

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-stretch overflow-hidden">
      {/* Left Image Panel */}
      <motion.div
        className={cn(
          "w-full lg:w-1/2 bg-cover bg-center relative grayscale hover:grayscale-0 h-[70vh] lg:h-screen",
          isCms ? "" : "bg-[url('/theoryofchange.jpg')]",
        )}
        style={isCms ? { backgroundImage: `url(${data.image})` } : {}}
        initial={{ opacity: 0, scale: 1.2, x: -80 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {isCms ? (
          <EditableImage
            page={currentPage}
            section="theoryofchange"
            path={["image"]}
            src={data.image}
            alt="Theory of Change"
            fill
            className="w-full h-full object-cover"
            onSave={handleImageSave}
            onCancel={handleCancel}
          />
        ) : null}

        <motion.p
          className="font-bold text-sm md:text-lg absolute bottom-2 md:bottom-10 left-2 md:left-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {isCms ? (
            <EditableText
              page={currentPage}
              section="theoryofchange"
              path={["photoCredit"]}
              value={data.photoCredit}
              onSave={(val) => handleTextSave(["photoCredit"], val)}
              onCancel={handleCancel}
              className="font-bold text-sm md:text-lg"
            >
              {data.photoCredit}
            </EditableText>
          ) : (
            data.photoCredit
          )}
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
          {isCms ? (
            <EditableText
              page={currentPage}
              section="theoryofchange"
              path={["title"]}
              value={data.title}
              onSave={(val) => handleTextSave(["title"], val)}
              onCancel={handleCancel}
              className="text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "Myona-Sans" }}
            >
              {data.title}
            </EditableText>
          ) : (
            <motion.p
              className="text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "Myona-Sans" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {data.title}
            </motion.p>
          )}

          {isCms ? (
            <EditableText
              page={currentPage}
              section="theoryofchange"
              path={["firstParagraph"]}
              value={data.firstParagraph}
              onSave={(val) => handleTextSave(["firstParagraph"], val)}
              onCancel={handleCancel}
              className="text-base md:text-xl font-light mt-2 md:mt-4"
            >
              {data.firstParagraph}
            </EditableText>
          ) : (
            <motion.p
              className="text-base md:text-xl font-light mt-2 md:mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {data.firstParagraph}
            </motion.p>
          )}
        </motion.div>

        {/* Bottom Block */}
        <motion.div
          className="w-full bg-[#3A7E53] p-4 md:p-14 lg:h-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          {isCms ? (
            <EditableText
              page={currentPage}
              section="theoryofchange"
              path={["secondParagraph"]}
              value={data.secondParagraph}
              onSave={(val) => handleTextSave(["secondParagraph"], val)}
              onCancel={handleCancel}
              className="text-base md:text-xl font-light w-full"
            >
              {data.secondParagraph}
            </EditableText>
          ) : (
            <motion.p
              className="text-base md:text-xl font-light w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {data.secondParagraph}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
