// src/app/components/GalleryGrid/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditableText from "./cms/EditableText";
import EditableImage from "./cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";
import { KenyaCreatesIcon } from "./icons";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  span: string;
};

type GalleryData = {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  images: GalleryImage[];
};

const defaultData: GalleryData = {
  title: "OUR WHY",
  description:
    "For too long, reproductive health has been framed in a way that feels impersonal and inaccessible. Kenya Creates is here to change that. Our films speak to the heart, addressing the real barriers young people face while providing tools to navigate life with confidence. It’s not about dictating choices; it’s about recognizing what’s real and centering it to spark conversations that feel natural and empowering.",
  ctaText: "Check out KENYA CREATES",
  ctaUrl: "https://kenyacreates.org",
  images: [
    { id: 1, src: "/outdoor.png", alt: "", span: "row-span-1 col-span-1" },
    { id: 2, src: "/theatre.png", alt: "", span: "row-span-1 col-span-1" },
    { id: 3, src: "/long.png", alt: "", span: "row-span-2 col-span-1" },
    { id: 4, src: "/team.png", alt: "", span: "row-span-1 col-span-2" },
  ],
};

export default function GalleryGrid() {
  const [data, setData] = useState<GalleryData>(defaultData);
  const [isCms, setIsCms] = useState(false);
  const { add } = useEditorStore();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/content/gallery");
        if (res.ok) setData(await res.json());
      } catch {
        console.warn("Using default gallery content");
      }
    };
    load();
    setIsCms(window.location.pathname.startsWith("/cms"));
  }, []);

  const save = (path: (string | number)[], value: any) => {
    setData(prev => {
      const copy: any = JSON.parse(JSON.stringify(prev));
      let node = copy;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      node[path[path.length - 1]] = value;
      return copy;
    });
    add({ section: "gallery", path, value });
  };

  return (
    <div className="w-full h-fit p-4">
      <div className="max-w-7xl mx-auto h-full p-2">
        <motion.div
          className="grid gap-2 h-full grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {data.images.map((img, idx) => (
            <motion.div
              key={img.id}
              className={`relative overflow-hidden rounded-lg ${img.span} cursor-pointer group`}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.03 }}
            >
              {isCms ? (
                <EditableImage
                  section="gallery"
                  path={["images", idx, "src"]}
                  src={img.src}
                  alt={img.alt || `Image ${idx + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onSave={(v) => save(["images", idx, "src"], v)}
                  onCancel={() => {}}
                />
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {isCms ? (
                  <EditableText
                    section="gallery"
                    path={["images", idx, "alt"]}
                    value={img.alt}
                    onSave={(v) => save(["images", idx, "alt"], v)}
                    onCancel={() => {}}
                    className="text-white font-gilroy font-bold text-lg text-center px-4"
                  >
                    {img.alt || "(no caption)"}
                  </EditableText>
                ) : (
                  img.alt && (
                    <p className="text-white font-gilroy font-bold text-lg text-center px-4">
                      {img.alt}
                    </p>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text Section */}
      <div className="w-full flex flex-col items-center justify-center gap-10 relative z-10 mt-16">
        {isCms ? (
          <EditableText
            section="gallery"
            path={["title"]}
            value={data.title}
            onSave={(v) => save(["title"], v)}
            onCancel={() => {}}
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-center"
            style={{ fontFamily: "Myona-Sans" }}
          >
            {data.title}
          </EditableText>
        ) : (
          <motion.p
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-center"
            style={{ fontFamily: "Myona-Sans" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {data.title}
          </motion.p>
        )}

        {isCms ? (
          <EditableText
            section="gallery"
            path={["description"]}
            value={data.description}
            onSave={(v) => save(["description"], v)}
            onCancel={() => {}}
            className="text-center w-2/3 md:text-xl text-white/90 leading-relaxed"
          >
            {data.description}
          </EditableText>
        ) : (
          <motion.p
            className="text-center w-2/3 md:text-xl text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {data.description}
          </motion.p>
        )}

        {/* CTA */}
        {isCms ? (
          <div className="flex items-center gap-4">
            <EditableText
              section="gallery"
              path={["ctaText"]}
              value={data.ctaText}
              onSave={(v) => save(["ctaText"], v)}
              onCancel={() => {}}
              className="bg-[#4C565C] rounded-full px-8 py-3 border border-white flex items-center justify-center gap-4 font-bold font-gilroy text-base text-white shadow-lg hover:shadow-xl hover:bg-[#5C676E] transition-all"
            >
              <div>{data.ctaText}</div>
              <div><KenyaCreatesIcon /></div>
            </EditableText>
            <EditableText
              section="gallery"
              path={["ctaUrl"]}
              value={data.ctaUrl}
              onSave={(v) => save(["ctaUrl"], v)}
              onCancel={() => {}}
              className="text-sm text-white/70 underline"
            >
              {data.ctaUrl}
            </EditableText>
          </div>
        ) : (
          <motion.a
            href={data.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <div className="bg-[#4C565C] rounded-full px-8 py-3 border border-white flex items-center justify-center gap-4 font-bold font-gilroy text-base text-white shadow-lg hover:shadow-xl hover:bg-[#5C676E] transition-all">
              <div>{data.ctaText}</div>
              <div><KenyaCreatesIcon /></div>
            </div>
          </motion.a>
        )}
      </div>
    </div>
  );
}