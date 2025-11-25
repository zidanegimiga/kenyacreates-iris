// src/app/components/Footer/index.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditableText from "./cms/EditableText";
import EditableImage from "./cms/EditableImage";
import { useEditorStore } from "@/lib/useContent";
import TwitterIcon, { FacebookIcon, InstagramIcon } from "./icons";

type NavLink = {
  label: string;
  href: string;
};

type SocialLink = {
  platform: "facebook" | "twitter" | "instagram";
  url: string;
};

type FooterData = {
  logoSrc: string;
  description: string;
  navigationLinks: NavLink[];
  rightLinks: NavLink[];
  socialLinks: SocialLink[];
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
  socialLinks: [
    { platform: "facebook", url: "#facebook" },
    { platform: "twitter", url: "#twitter" },
    { platform: "instagram", url: "#instagram" },
  ],
};

export default function Footer() {
  const [data, setData] = useState<FooterData>(defaultData);
  const [isCms, setIsCms] = useState(false);
  const { add } = useEditorStore();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/content/footer");
        if (res.ok) setData(await res.json());
      } catch {
        console.warn("Using default footer content");
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
    add({ section: "footer", path, value });
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FacebookIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "instagram":
        return <InstagramIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-8xl mx-auto sm:px-4 md:px-12 lg:px-16 py-12 lg:py-16 text-white w-full">
      {/* Desktop and Tablet Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Section - Logo and Description */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            {isCms ? (
              <EditableImage
                section="footer"
                path={["logoSrc"]}
                src={data.logoSrc}
                alt="IRIS LOGO"
                width={120}
                height={39}
                className="object-contain"
                onSave={(v) => save(["logoSrc"], v)}
                onCancel={() => {}}
              />
            ) : (
              <Image
                src={data.logoSrc}
                alt="IRIS LOGO"
                title="IRIS LOGO"
                width={120}
                height={39}
              />
            )}
          </div>

          {isCms ? (
            <EditableText
              section="footer"
              path={["description"]}
              value={data.description}
              onSave={(v) => save(["description"], v)}
              onCancel={() => {}}
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
          <div className="flex gap-4 mt-8">
            {data.socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={isCms ? undefined : social.url}
                aria-label={social.platform}
                className={isCms ? "cursor-default" : "hover:opacity-80 transition-opacity"}
              >
                {isCms ? (
                  <div className="relative group">
                    {renderSocialIcon(social.platform)}
                    <EditableText
                      section="footer"
                      path={["socialLinks", idx, "url"]}
                      value={social.url}
                      onSave={(v) => save(["socialLinks", idx, "url"], v)}
                      onCancel={() => {}}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70 whitespace-nowrap"
                    >
                      {social.url}
                    </EditableText>
                  </div>
                ) : (
                  renderSocialIcon(social.platform)
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="lg:col-span-1">
          <nav className="space-y-4">
            {data.navigationLinks.map((link, idx) => (
              <div key={idx} className="block">
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={["navigationLinks", idx, "label"]}
                      value={link.label}
                      onSave={(v) => save(["navigationLinks", idx, "label"], v)}
                      onCancel={() => {}}
                      className="text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit block"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={["navigationLinks", idx, "href"]}
                      value={link.href}
                      onSave={(v) => save(["navigationLinks", idx, "href"], v)}
                      onCancel={() => {}}
                      className="text-xs text-white/60 ml-2"
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

        {/* Right Section - Contact & Careers */}
        <div className="lg:col-span-1 lg:text-right">
          <nav className="space-y-4 lg:flex lg:flex-col lg:items-end">
            {data.rightLinks.map((link, idx) => (
              <div key={idx} className="block">
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={["rightLinks", idx, "label"]}
                      value={link.label}
                      onSave={(v) => save(["rightLinks", idx, "label"], v)}
                      onCancel={() => {}}
                      className="text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit block"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={["rightLinks", idx, "href"]}
                      value={link.href}
                      onSave={(v) => save(["rightLinks", idx, "href"], v)}
                      onCancel={() => {}}
                      className="text-xs text-white/60 ml-2"
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
              alt="IRIS LOGO"
              width={120}
              height={39}
              className="object-contain"
              onSave={(v) => save(["logoSrc"], v)}
              onCancel={() => {}}
            />
          ) : (
            <Image
              src={data.logoSrc}
              alt="IRIS LOGO"
              title="IRIS LOGO"
              width={120}
              height={39}
            />
          )}
        </div>

        {isCms ? (
          <EditableText
            section="footer"
            path={["description"]}
            value={data.description}
            onSave={(v) => save(["description"], v)}
            onCancel={() => {}}
            className="text-gray-300 leading-relaxed text-sm mb-8"
          >
            {data.description}
          </EditableText>
        ) : (
          <p className="text-gray-300 leading-relaxed text-sm mb-8">
            {data.description}
          </p>
        )}

        <nav className="space-y-3 mb-8">
          {[...data.navigationLinks, ...data.rightLinks].map((link, idx) => {
            const isRight = idx >= data.navigationLinks.length;
            const arr = isRight ? data.rightLinks : data.navigationLinks;
            const realIdx = isRight ? idx - data.navigationLinks.length : idx;
            const pathPrefix = isRight ? ["rightLinks", realIdx] : ["navigationLinks", realIdx];

            return (
              <div key={idx}>
                {isCms ? (
                  <>
                    <EditableText
                      section="footer"
                      path={[...pathPrefix, "label"]}
                      value={link.label}
                      onSave={(v) => save([...pathPrefix, "label"], v)}
                      onCancel={() => {}}
                      className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base font-light border-b border-[#f5a742] pb-1 w-fit"
                    >
                      {link.label}
                    </EditableText>
                    <EditableText
                      section="footer"
                      path={[...pathPrefix, "href"]}
                      value={link.href}
                      onSave={(v) => save([...pathPrefix, "href"], v)}
                      onCancel={() => {}}
                      className="text-xs text-white/60 ml-2"
                    >
                      → {link.href}
                    </EditableText>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className=" spywareblock text-[#f5a742] hover:text-[#ffb855] transition-colors text-base font-light border-b border-[#f5a742] pb-1 w-fit"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex gap-4">
          {data.socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={isCms ? undefined : social.url}
              aria-label={social.platform}
              className={isCms ? "cursor-default" : "hover:opacity-80 transition-opacity"}
            >
              {renderSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}