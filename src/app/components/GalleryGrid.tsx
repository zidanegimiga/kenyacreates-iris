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
    "For too long, reproductive health has been framed in a way that feels impersonal and inaccessible. Kenya Creates is here to change that. Our films speak to the heart, addressing the real barriers young people face while providing tools to navigate life with confidence.",
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
  const [currentPage, setCurrentPage] = useState(""); 
  const { add } = useEditorStore();

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
        const res = await fetch(`/api/content/${page}/gallery`);
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
    // FIX: Pass the currentPage so the publish API doesn't 404
    add({ page: currentPage, section: "gallery", path, value });
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
              className={`relative overflow-hidden rounded-lg ${img.span} group bg-slate-800`}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.03 }}
            >
              {isCms ? (
                <div className="relative h-full w-full">
                  <EditableImage
                    page={currentPage}
                    section="gallery"
                    path={["images", idx, "src"]}
                    src={img.src}
                    alt={img.alt || `Image ${idx + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onSave={(path, v) => save(path, v)}
                    onCancel={() => {}}
                  />
                  
                  {/* CMS CAPTION: Moved to a non-blocking bar at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-2 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <EditableText
                      page={currentPage}
                      section="gallery"
                      path={["images", idx, "alt"]}
                      value={img.alt}
                      onSave={(v) => save(["images", idx, "alt"], v)}
                      onCancel={() => {}}
                      className="text-white text-xs block w-full text-center italic"
                    >
                      {img.alt || "Add Caption..."}
                    </EditableText>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {img.alt && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <p className="text-white font-gilroy font-bold text-lg text-center px-4">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text Section */}
      <div className="w-full flex flex-col items-center justify-center gap-10 relative z-10 mt-16 text-white">
        {isCms ? (
          <EditableText
            page={currentPage}
            section="gallery"
            path={["title"]}
            value={data.title}
            onSave={(v) => save(["title"], v)}
            onCancel={() => {}}
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-center block"
            style={{ fontFamily: "Myona-Sans" }}
          >
            {data.title}
          </EditableText>
        ) : (
          <motion.h2
            className="uppercase mt-10 text-4xl md:text-5xl font-bold font-myona text-center"
            style={{ fontFamily: "Myona-Sans" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data.title}
          </motion.h2>
        )}

        {isCms ? (
          <EditableText
            page={currentPage}
            section="gallery"
            path={["description"]}
            value={data.description}
            onSave={(v) => save(["description"], v)}
            onCancel={() => {}}
            className="text-center w-full max-w-2xl md:text-xl text-white/90 leading-relaxed block px-4"
          >
            {data.description}
          </EditableText>
        ) : (
          <motion.p
            className="text-center w-full max-w-2xl md:text-xl text-white/90 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.description}
          </motion.p>
        )}

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 pb-20">
          {isCms ? (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#4C565C] rounded-full px-8 py-3 border border-white flex items-center justify-center gap-4 shadow-lg">
                <EditableText
                  page={currentPage}
                  section="gallery"
                  path={["ctaText"]}
                  value={data.ctaText}
                  onSave={(v) => save(["ctaText"], v)}
                  onCancel={() => {}}
                  className="font-bold font-gilroy text-base text-white"
                >
                  {data.ctaText}
                </EditableText>
                <KenyaCreatesIcon />
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-white/10">
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Link:</span>
                <EditableText
                  page={currentPage}
                  section="gallery"
                  path={["ctaUrl"]}
                  value={data.ctaUrl}
                  onSave={(v) => save(["ctaUrl"], v)}
                  onCancel={() => {}}
                  className="text-xs text-white/70 underline"
                >
                  {data.ctaUrl}
                </EditableText>
              </div>
            </div>
          ) : (
            <motion.a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#4C565C] rounded-full px-8 py-3 border border-white flex items-center justify-center gap-4 font-bold font-gilroy text-base text-white shadow-lg hover:bg-[#5C676E] transition-all"
            >
              {data.ctaText}
              <KenyaCreatesIcon />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}