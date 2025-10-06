"use client";

import Image from "next/image";
import TwitterIcon, { FacebookIcon, IconLeft, InstagramIcon } from "./icons";

export default function Navigation() {
  return (
    <div className="w-full px-12 py-4 flex items-center justify-between bg-transparent fixed top-0">
      <a href="https://storyforimpact.io" target="_blank">
        <div className="flex gap-4 items-center">
          <IconLeft />
          <p className="text-base font-gilroy font-light">Back to Projects</p>
        </div>
      </a>

      <div className="">
        <Image
          src={"/logo.png"}
          alt="IRIS LOGO"
          title="IRIS LOGO"
          width={120}
          height={39}
        />
      </div>

      <div className="flex justify-between gap-4 items-center">
        <FacebookIcon/>
        <TwitterIcon/>
        <InstagramIcon/>
      </div>
    </div>
  );
}
