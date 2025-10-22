// src/app/components/HeroSection/index.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VideoPlayer from "../VideoPlayer";
import cn from "classnames";

import EditableText from "../cms/EditableText";
import EditableImage from "../cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";

type HeroData = {
  initialText: string;
  logo: string;
  heroImage: string;
  paragraph: string;
  vision: { title: string; text: string };
  goal: { title: string; text: string; videoUrl: string };
  images: { visionBg: string; visionFg: string };
};

const defaultData: HeroData = {
  initialText: "/initialText.png",
  logo: "/TextVector.svg",
  heroImage: "/hero.png",
  paragraph:
    "Kenya Creates is a storytelling initiative dedicated to reimagining how Kenyan youth talk about their bodies and health. We move beyond legalese and jargon to embrace a language that’s deeply personal, relatable, and rooted in our local history.",
  vision: {
    title: "OUR VISION",
    text:
      "We believe young people deserve to lead conversations about their lives. By shifting the focus from policy-driven rhetoric to authentic, human stories, we center the real emotions of grappling with love, sex, relationships, and body issues from the Kenyan youth perspective. This shift moves the conversation to higher ground.",
  },
  goal: {
    title: "OUR Goal",
    text:
      "Kenya Creates is building a bridge between what’s unsaid and what needs to be shared. Our goal is simple: to create a culture where health, love, and self-respect are celebrated without judgment.",
    videoUrl: "https://www.youtube.com/watch?v=Gw1OQESCbzw",
  },
  images: { visionBg: "/vision.png", visionFg: "/group.png" },
};

export default function HeroSection() {
  const [data, setData] = useState<HeroData>(defaultData);
  const [isCms, setIsCms] = useState(false);
  const { add } = useEditorStore();

  // -------------------------------------------------
  // Load content + detect CMS mode
  // -------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/content/hero");
        console.log("HIT DIFFERENT ENDPOINT");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.warn("Failed to load hero content, using defaults");
      }
    };
    load();

    // Detect if we are inside the CMS editor
    setIsCms(window.location.pathname.startsWith("/cms"));
  }, []);

  const handleTextSave = (path: (string | number)[], newValue: string) => {
    setData((prev) => {
      const newData = { ...prev };
      let node = newData;
      for (let i = 0; i < path.length - 1; i++) {
        // @ts-ignore
        node = node[path[i]] as any;
      }
      // @ts-ignore
      node[path[path.length - 1]] = newValue;
      return newData;
    });
    add({ section: "hero", path, value: newValue });
  };

  const handleImageSave = (path: (string | number)[], newUrl: string) => {
    setData((prev) => {
      const newData = { ...prev };
      let node = newData;
      for (let i = 0; i < path.length - 1; i++) {
        // @ts-ignore
        node = node[path[i]] as any;
      }
      // @ts-ignore
      node[path[path.length - 1]] = newUrl;
      return newData;
    });
    add({ section: "hero", path, value: newUrl });
  };

  const handleCancel = () => {
    // No-op for now; could revert local state if needed
  };

  return (
    <div className="w-full text-center">
      {/* -------------------------------------------------
          Top Intro Text
      ------------------------------------------------- */}
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {isCms ? (
          <EditableImage
            section="hero"
            path={["initialText"]}
            src={data.initialText}
            alt="Story"
            width={530}
            height={93}
            onSave={handleImageSave}
            onCancel={handleCancel}
          />
        ) : (
          <Image src={data.initialText} alt="Story" width={530} height={93} />
        )}
      </motion.div>

      {/* -------------------------------------------------
          Sub Text Logo
      ------------------------------------------------- */}
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="inline-block">
          {isCms ? (
            <EditableImage
              section="hero"
              path={["logo"]}
              src={data.logo}
              alt="African Storytelling"
              width={0}
              height={0}
              className="w-full h-auto"
              onSave={handleImageSave}
              onCancel={handleCancel}
            />
          ) : (
            <Image
              src={data.logo}
              alt="African Storytelling"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          )}
        </div>
      </motion.div>

      {/* -------------------------------------------------
          Hero Image
      ------------------------------------------------- */}
      <motion.div
        className="w-full flex justify-center items-center p-4 mt-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        {isCms ? (
          <EditableImage
            section="hero"
            path={["heroImage"]}
            src={data.heroImage}
            alt="Hero"
            width={1136}
            height={412}
            onSave={handleImageSave}
            onCancel={handleCancel}
          />
        ) : (
          <Image src={data.heroImage} alt="Hero" width={1136} height={412} />
        )}
      </motion.div>

      {/* -------------------------------------------------
          Paragraph
      ------------------------------------------------- */}
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {isCms ? (
          <EditableText
            section="hero"
            path={["paragraph"]}
            value={data.paragraph}
            onSave={(val) => handleTextSave(["paragraph"], val)}
            onCancel={handleCancel}
            className="font-gilroy font-light text-xl text-center max-w-[800px] my-10"
          >
            {data.paragraph}
          </EditableText>
        ) : (
          <p className="font-gilroy font-light text-xl text-center max-w-[800px] my-10">
            {data.paragraph}
          </p>
        )}
      </motion.div>

      {/* -------------------------------------------------
          Vision Section
      ------------------------------------------------- */}
      <motion.section
        className="relative flex flex-col md:flex-row items-center justify-between bg-[#C2670C] text-white overflow-hidden h-[300px] md:h-[500px]"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-2/5 z-10 p-4 md:p-6 md:pt-16 md:pl-12 flex flex-col justify-center h-full">
          {isCms ? (
            <>
              <EditableText
                section="hero"
                path={["vision", "title"]}
                value={data.vision.title}
                onSave={(val) => handleTextSave(["vision", "title"], val)}
                onCancel={handleCancel}
                className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
                style={{ fontFamily: "Myona Sans" }}
              >
                {data.vision.title}
              </EditableText>

              <EditableText
                section="hero"
                path={["vision", "text"]}
                value={data.vision.text}
                onSave={(val) => handleTextSave(["vision", "text"], val)}
                onCancel={handleCancel}
                className="text-base md:text-xl leading-6 md:leading-7 text-left"
              >
                {data.vision.text}
              </EditableText>
            </>
          ) : (
            <>
              <h2
                className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
                style={{ fontFamily: "Myona Sans" }}
              >
                {data.vision.title}
              </h2>
              <p className="text-base md:text-xl leading-6 md:leading-7 text-left">
                {data.vision.text}
              </p>
            </>
          )}
        </div>

        <div className="w-full md:w-3/5 h-full relative">
          {isCms ? (
            <EditableImage
              section="hero"
              path={["images", "visionBg"]}
              src={data.images.visionBg}
              alt="Vision background"
              fill
              className="z-0 object-cover"
              onSave={handleImageSave}
              onCancel={handleCancel}
            />
          ) : (
            <Image
              src={data.images.visionBg}
              alt="Vision background"
              fill
              className="z-0 object-cover"
            />
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-0 md:bottom-0 right-2 md:right-8 z-10"
          >
            {isCms ? (
              <EditableImage
                section="hero"
                path={["images", "visionFg"]}
                src={data.images.visionFg}
                alt="Vision foreground"
                width={696}
                height={494}
                onSave={handleImageSave}
                onCancel={handleCancel}
              />
            ) : (
              <Image src={data.images.visionFg} alt="Vision foreground" width={696} height={494} />
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* -------------------------------------------------
          Goal Section
      ------------------------------------------------- */}
      <motion.div
        className={cn(
          "relative flex flex-col md:flex-row items-center justify-between text-white overflow-hidden py-5 md:py-20 h-auto md:h-[70vh]"
        )}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 px-2 md:px-10 py-2 md:py-5">
          {isCms ? (
            <EditableText
              section="hero"
              path={["goal", "videoUrl"]}
              value={data.goal.videoUrl}
              onSave={(val) => handleTextSave(["goal", "videoUrl"], val)}
              onCancel={handleCancel}
              className="hidden" // Hidden input for URL editing
            >
              {data.goal.videoUrl}
            </EditableText>
          ) : null}
          <VideoPlayer url={data.goal.videoUrl} className="w-full" />
        </div>

        <motion.div
          className="w-full md:w-1/2 z-10 p-4 md:p-6 md:pt-16 md:pl-12 flex flex-col justify-center h-full"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
        >
          {isCms ? (
            <>
              <EditableText
                section="hero"
                path={["goal", "title"]}
                value={data.goal.title}
                onSave={(val) => handleTextSave(["goal", "title"], val)}
                onCancel={handleCancel}
                className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
                style={{ fontFamily: "Myona Sans" }}
              >
                {data.goal.title}
              </EditableText>

              <EditableText
                section="hero"
                path={["goal", "text"]}
                value={data.goal.text}
                onSave={(val) => handleTextSave(["goal", "text"], val)}
                onCancel={handleCancel}
                className="text-base md:text-xl leading-6 md:leading-7 text-left"
              >
                {data.goal.text}
              </EditableText>
            </>
          ) : (
            <>
              <h2
                className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
                style={{ fontFamily: "Myona Sans" }}
              >
                {data.goal.title}
              </h2>
              <p className="text-base md:text-xl leading-6 md:leading-7 text-left">
                {data.goal.text}
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}