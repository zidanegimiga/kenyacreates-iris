import Image from "next/image";
import React from "react";
import TwitterIcon, { FacebookIcon, InstagramIcon } from "./icons";

const Footer = () => {
  const navigationLinks = [
    { label: "The IRIS Story", href: "https://storyforimpact.io/" },
    { label: "Meet the Team", href: "https://storyforimpact.io/our-voices" },
    // { label: "IRIS Ideas", href: "#ideas" },
    { label: "Highlighted Projects", href: "https://storyforimpact.io/projects" },
    { label: "IRIS Blog", href: "https://storyforimpact.io/blog" },
  ];

  const rightLinks = [
    { label: "Contact", href: "https://storyforimpact.io/contact" },
    { label: "Careers", href: "https://storyforimpact.io/careers" },
  ];

  return (
      <div className="max-w-8xl mx-auto sm:px-4 md:px-12 lg:px-16 py-12 lg:py-16 text-white w-full">
        {/* Desktop and Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Section - Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div>
                <Image
                  src="/logo.png"
                  alt="IRIS LOGO"
                  title="IRIS LOGO"
                  width={120}
                  height={39}
                />
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
              Together with funders and civil society leaders, we work to
              strengthen and support networks and initiatives that initiate new
              conversations and collaborations between independent storytellers
              and journalists and community-based movements, informed by
              narrative strategies.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <FacebookIcon />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="hover:opacity-80 transition-opacity"
              >
                <TwitterIcon />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="lg:col-span-1">
            <nav className="space-y-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section - Contact & Careers */}
          <div className="lg:col-span-1 lg:text-right">
            <nav className="space-y-4 lg:flex lg:flex-col lg:items-end">
              {rightLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base lg:text-lg font-light border-b border-[#f5a742] pb-1 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden px-4">
          {/* Logo */}
          <div className="mb-6">
            <div>
              <Image
                src="/logo.png"
                alt="IRIS LOGO"
                title="IRIS LOGO"
                width={120}
                height={39}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm mb-8">
            Together with funders and civil society leaders, we work to
            strengthen and support networks and initiatives that initiate new
            conversations and collaborations between independent storytellers
            and journalists and community-based movements, informed by narrative
            strategies.
          </p>

          {/* Navigation Links */}
          <nav className="space-y-3 mb-8">
            {[...navigationLinks, ...rightLinks].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-[#f5a742] hover:text-[#ffb855] transition-colors text-base font-light border-b border-[#f5a742] pb-1 w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#facebook"
              aria-label="Facebook"
              className="hover:opacity-80 transition-opacity"
            >
              <FacebookIcon />
            </a>
            <a
              href="#twitter"
              aria-label="Twitter"
              className="hover:opacity-80 transition-opacity"
            >
              <TwitterIcon />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="hover:opacity-80 transition-opacity"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
  );
};

export default Footer;
