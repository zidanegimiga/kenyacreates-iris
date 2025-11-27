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
  const { add } = useEditorStore();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/content/footer");
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

  const handleTextSave = (path: (string | number)[], newValue: string) => {
    setData((prev) => {
      const newData: any = { ...prev };
      let node: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]];
      }
      node[path[path.length - 1]] = newValue;
      return newData;
    });
    add({ section: "footer", path, value: newValue });
  };

  const handleImageSave = (path: (string | number)[], newUrl: string) => {
    setData((prev) => {
      const newData: any = { ...prev };
      let node: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]];
      }
      node[path[path.length - 1]] = newUrl;
      return newData;
    });
    add({ section: "footer", path, value: newUrl });
  };

  const handleCancel = () => {};

  return (
    <footer className="max-w-8xl mx-auto sm:px-4 md:px-12 lg:px-16 py-12 lg:py-16 text-white w-full">
      {/* Desktop & Tablet */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            {isCms ? (
              <EditableImage
                section="footer"
                path={["logoSrc"]}
                src={data.logoSrc}
                alt="IRIS Logo"
                width={120}
                height={39}
                onSave={handleImageSave}
                onCancel={handleCancel}
              />
            ) : (
              <Image src={data.logoSrc} alt="IRIS Logo" width={120} height={39} />
            )}
          </div>

          {isCms ? (
            <EditableText
              section="footer"
              path={["description"]}
              value={data.description}
              onSave={(v) => handleTextSave(["description"], v)}
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

          {/* Social Icons */}
          <div className="flex gap-6 mt-8">
            <a href={data.social.facebook} aria-label="Facebook" className="hover:opacity-80 transition">
              <FacebookIcon />
            </a>
            <a href={data.social.twitter} aria-label="Twitter" className="hover:opacity-80 transition">
              <TwitterIcon />
            </a>
            <a href={data.social.instagram} aria-label="Instagram" className="hover:opacity-80 transition">
              <InstagramIcon />
            </a>
          </div>

          {/* Social URLs visible only in CMS */}
          {isCms && (
            <div className="mt-6 space-y-2 text-xs text-white/60">
              <EditableText
                section="footer"
                path={["social", "facebook"]}
                value={data.social.facebook}
                onSave={(v) => handleTextSave(["social", "facebook"], v)}
                onCancel={handleCancel}
                className="block"
              >
                FB: {data.social.facebook}
              </EditableText>
              <EditableText
                section="footer"
                path={["social", "twitter"]}
                value={data.social.twitter}
                onSave={(v) => handleTextSave(["social", "twitter"], v)}
                onCancel={handleCancel}
                className="block"
              >
                TW: {data.social.twitter}
              </EditableText>
              <EditableText
                section="footer"
                path={["social", "instagram"]}
                value={data.social.instagram}
                onSave={(v) => handleTextSave(["social", "instagram"], v)}
                onCancel={handleCancel}
                className="block"
              >
                IG: {data.social.instagram}
              </EditableText>
            </div>
          )}
        </div>

        {/* Middle Column - Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-4">
            {data.navigationLinks.map((link, i) => (
              <div key={i}>
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={["navigationLinks", i, "label"]}
                      value={link.label}
                      onSave={(v) => handleTextSave(["navigationLinks", i, "label"], v)}
                      onCancel={handleCancel}
                      className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={["navigationLinks", i, "href"]}
                      value={link.href}
                      onSave={(v) => handleTextSave(["navigationLinks", i, "href"], v)}
                      onCancel={handleCancel}
                      className="text-xs text-white/50 ml-2"
                    >
                      → {link.href}
                    </EditableText>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 lg:text-right">
          <nav className="space-y-4 lg:flex lg:flex-col lg:items-end">
            {data.rightLinks.map((link, i) => (
              <div key={i}>
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={["rightLinks", i, "label"]}
                      value={link.label}
                      onSave={(v) => handleTextSave(["rightLinks", i, "label"], v)}
                      onCancel={handleCancel}
                      className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={["rightLinks", i, "href"]}
                      value={link.href}
                      onSave={(v) => handleTextSave(["rightLinks", i, "href"], v)}
                      onCancel={handleCancel}
                      className="text-xs text-white/50 ml-2"
                    >
                      → {link.href}
                    </EditableText>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4">
        <div className="mb-6">
          {isCms ? (
            <EditableImage
              section="footer"
              path={["logoSrc"]}
              src={data.logoSrc}
              alt="IRIS Logo"
              width={120}
              height={39}
              onSave={handleImageSave}
              onCancel={handleCancel}
            />
          ) : (
            <Image src={data.logoSrc} alt="IRIS Logo" width={120} height={39} />
          )}
        </div>

        {isCms ? (
          <EditableText
            section="footer"
            path={["description"]}
            value={data.description}
            onSave={(v) => handleTextSave(["description"], v)}
            onCancel={handleCancel}
            className="text-gray-300 leading-relaxed text-sm mb-8"
          >
            {data.description}
          </EditableText>
        ) : (
          <p className="text-gray-300 leading-relaxed text-sm mb-8">{data.description}</p>
        )}

        <nav className="space-y-3 mb-8">
          {[...data.navigationLinks, ...data.rightLinks].map((link, i) => {
            const isRight = i >= data.navigationLinks.length;
            const idx = isRight ? i - data.navigationLinks.length : i;
            const pathPrefix = isRight ? ["rightLinks", idx] : ["navigationLinks", idx];

            return (
              <div key={i}>
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={[...pathPrefix, "label"]}
                      value={link.label}
                      onSave={(v) => handleTextSave([...pathPrefix, "label"], v)}
                      onCancel={handleCancel}
                      className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base font-light border-b border-[#f5a742] pb-1 w-fit"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={[...pathPrefix, "href"]}
                      value={link.href}
                      onSave={(v) => handleTextSave([...pathPrefix, "href"], v)}
                      onCancel={handleCancel}
                      className="text-xs text-white/50 ml-2"
                    >
                      → {link.href}
                    </EditableText>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base font-light border-b border-[#f5a742] pb-1 w-fit"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex gap-6">
          <a href={data.social.facebook} aria-label="Facebook" className="hover:opacity-80 transition">
            <FacebookIcon />
          </a>
          <a href={data.social.twitter} aria-label="Twitter" className="hover:opacity-80 transition">
            <TwitterIcon />
          </a>
          <a href={data.social.instagram} aria-label="Instagram" className="hover:opacity-80 transition">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}