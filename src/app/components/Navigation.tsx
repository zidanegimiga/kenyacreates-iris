"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TwitterIcon, { FacebookIcon, IconLeft, InstagramIcon } from "./icons";
import cn from "classnames";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 100);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "w-full fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        {
          "translate-y-0 opacity-100": isVisible,
          "-translate-y-full opacity-0": !isVisible,
          "bg-transparent": !isScrolled,
          "bg-[#313d41be] backdrop-blur-md shadow-md": isScrolled,
        }
      )}
    >
      <div className="flex items-center justify-between sm:px-10 md:px-16 py-3 px-10">
        <a
          href="https://storyforimpact.io/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 sm:gap-4 items-center"
        >
          <IconLeft />
          <p className="text-sm sm:text-base font-gilroy font-light whitespace-nowrap">
            Back to Projects
          </p>
        </a>

        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="IRIS LOGO"
            title="IRIS LOGO"
            width={100}
            height={32}
            className="sm:w-[120px] sm:h-[39px] object-contain"
          />
        </div>

        <div className="hidden sm:flex justify-between gap-3 sm:gap-4 items-center">
          <a href="https://www.instagram.com/irisstoryforimpact/?hl=en">
            <InstagramIcon />
          </a>
          <a href="https://x.com/storyforimpact?lang=en">
            <TwitterIcon />
          </a>
          <a href="https://www.linkedin.com/company/storyforimpact/">
            <FacebookIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
