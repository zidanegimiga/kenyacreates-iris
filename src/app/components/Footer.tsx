// src/app/components/Footer/index.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditableText from "./cms/EditableText";
import EditableImage from "./cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";
import TwitterIcon, { FacebookIcon, InstagramIcon } from "./icons";

type NavLink = { label: string; href: string };

type FooterData = {
  logoSrc: string;
  description: string;
  navigationLinks: NavLink[];
  rightLinks: NavLink[];
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
};

const defaultData: FooterData = {
  logoSrc: "/logo.png",
  description:
    "Together with funders and civil society leaders, we work to strengthen and support networks and initiatives that initiate new conversations and collaborations between independent storytellers and journalists and community-based movements, informed by narrative strategies.",
  navigationLinks: [
    { label: "The IRIS Story", href: "https://storyforimpact.io/" },
    { label: "Meet the Team", href: "https://storyforimpact.io/our-voices" },
    { label: "Highlighted Projects", href: "https://storyforimpact.io/projects" },
    { label: "IRIS Blog", href: "https://storyforimpact.io/blog" },
  ],
  rightLinks: [
    { label: "Contact", href: "https://storyforimpact.io/contact" },
    { label: "Careers", href: "https://storyforimpact.io/careers" },
  ],
  social: {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
  },
};

export default function Footer() {
  const [data, setData] = useState<FooterData>(defaultData);
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
        const res = await fetch(`/api/content/${page}/footer`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.warn("Failed to load footer content, using defaults");
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
    // FIX: Passing currentPage prevents the 404 publish error
    add({ page: currentPage, section: "footer", path, value });
  };

  const handleCancel = () => {};

  return (
    <footer className="max-w-8xl mx-auto sm:px-4 md:px-12 lg:px-16 py-12 lg:py-16 text-white w-full">
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Logo & Description */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            {isCms ? (
              <EditableImage
                page={currentPage}
                section="footer"
                path={["logoSrc"]}
                src={data.logoSrc}
                alt="Logo"
                width={120}
                height={39}
                onSave={(path, v) => save(path, v)}
                onCancel={handleCancel}
              />
            ) : (
              <Image src={data.logoSrc} alt="Logo" width={120} height={39} />
            )}
          </div>

          {isCms ? (
            <EditableText
              page={currentPage}
              section="footer"
              path={["description"]}
              value={data.description}
              onSave={(v) => save(["description"], v)}
              onCancel={handleCancel}
              className="text-gray-300 leading-relaxed text-sm lg:text-base"
            >
              {data.description}
            </EditableText>
          ) : (
            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
              {data.description}
            </p>
          )}

          {/* Social Icons & CMS URL Editors */}
          <div className="flex gap-6 mt-8">
            <a href={data.social.facebook} target="_blank" className="hover:opacity-80 transition"><FacebookIcon /></a>
            <a href={data.social.twitter} target="_blank" className="hover:opacity-80 transition"><TwitterIcon /></a>
            <a href={data.social.instagram} target="_blank" className="hover:opacity-80 transition"><InstagramIcon /></a>
          </div>

          {isCms && (
            <div className="mt-6 p-3 bg-white/5 rounded-lg space-y-2 border border-white/10">
              <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-2">Social Links</p>
              {Object.entries(data.social).map(([platform, url]) => (
                <div key={platform} className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase">{platform}</span>
                  <EditableText
                    page={currentPage}
                    section="footer"
                    path={["social", platform]}
                    value={url}
                    onSave={(v) => save(["social", platform], v)}
                    onCancel={handleCancel}
                    className="text-[11px] text-white/80 underline truncate block"
                  >
                    {url}
                  </EditableText>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Middle Column: Nav Links */}
        <div className="lg:col-span-1">
          <nav className="space-y-6">
            {data.navigationLinks.map((link, i) => (
              <div key={i} className="group">
                {isCms ? (
                  <div className="flex flex-col gap-1">
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={["navigationLinks", i, "label"]}
                      value={link.label}
                      onSave={(v) => save(["navigationLinks", i, "label"], v)}
                      onCancel={handleCancel}
                      className="text-[#f5a742] text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit cursor-pointer"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={["navigationLinks", i, "href"]}
                      value={link.href}
                      onSave={(v) => save(["navigationLinks", i, "href"], v)}
                      onCancel={handleCancel}
                      className="text-[10px] text-white/40 italic"
                    >
                      {link.href}
                    </EditableText>
                  </div>
                ) : (
                  <a href={link.href} className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit">
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Column: Secondary Links */}
        <div className="lg:col-span-1 lg:text-right">
          <nav className="space-y-6 lg:flex lg:flex-col lg:items-end">
            {data.rightLinks.map((link, i) => (
              <div key={i} className="group">
                {isCms ? (
                  <div className="flex flex-col lg:items-end gap-1">
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={["rightLinks", i, "label"]}
                      value={link.label}
                      onSave={(v) => save(["rightLinks", i, "label"], v)}
                      onCancel={handleCancel}
                      className="text-[#f5a742] text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit cursor-pointer"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={["rightLinks", i, "href"]}
                      value={link.href}
                      onSave={(v) => save(["rightLinks", i, "href"], v)}
                      onCancel={handleCancel}
                      className="text-[10px] text-white/40 italic"
                    >
                      {link.href}
                    </EditableText>
                  </div>
                ) : (
                  <a href={link.href} className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit">
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden px-4 space-y-10">
        <div className="space-y-6">
          {isCms ? (
            <EditableImage
              page={currentPage}
              section="footer"
              path={["logoSrc"]}
              src={data.logoSrc}
              alt="Logo"
              width={100}
              height={32}
              onSave={(path, v) => save(path, v)}
              onCancel={handleCancel}
            />
          ) : (
            <Image src={data.logoSrc} alt="Logo" width={100} height={32} />
          )}

          {isCms ? (
            <EditableText
              page={currentPage}
              section="footer"
              path={["description"]}
              value={data.description}
              onSave={(v) => save(["description"], v)}
              onCancel={handleCancel}
              className="text-gray-300 text-sm leading-relaxed"
            >
              {data.description}
            </EditableText>
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed">{data.description}</p>
          )}
        </div>

        <nav className="space-y-4">
          {[...data.navigationLinks, ...data.rightLinks].map((link, i) => {
            const isRight = i >= data.navigationLinks.length;
            const idx = isRight ? i - data.navigationLinks.length : i;
            const keyPath = isRight ? "rightLinks" : "navigationLinks";
            
            return (
              <div key={i}>
                {isCms ? (
                  <div className="flex flex-col gap-1 mb-4">
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={[keyPath, idx, "label"]}
                      value={link.label}
                      onSave={(v) => save([keyPath, idx, "label"], v)}
                      onCancel={handleCancel}
                      className="text-[#f5a742] text-base font-light border-b border-[#f5a742] pb-1 w-fit"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      page={currentPage}
                      section="footer"
                      path={[keyPath, idx, "href"]}
                      value={link.href}
                      onSave={(v) => save([keyPath, idx, "href"], v)}
                      onCancel={handleCancel}
                      className="text-[10px] text-white/40 italic"
                    >
                      {link.href}
                    </EditableText>
                  </div>
                ) : (
                  <a href={link.href} className="block text-[#f5a742] text-base font-light border-b border-[#f5a742] pb-1 w-fit">
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex gap-6 pb-10">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
      </div>
    </footer>
  );
}