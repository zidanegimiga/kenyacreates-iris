// src/app/kenyacreates/page.tsx
import HeroSection from "../components/HeroSection";
import Navigation from "../components/Navigation";
import styles from "./kenyacreates.module.css";
import cn from "classnames";
import BehaviouralSection from "../components/BehaviouralSection";
import MeetFilMakers from "../components/Filmakers";
import GalleryGrid from "../components/GalleryGrid";
import Footer from "../components/Footer";
import TheoryOfChange from "../components/TheoryOfChange";

export default function KenyaCreatesPage() {
  return (
    <div className="w-screen relative">
      <div className={cn(styles.heroWrapper, "w-full")}>
        <div className={cn("pt-24", styles.bgWrapper)}>
          <Navigation />
          {/* <HeroSection /> */}
        </div>
      </div>

      {/* <TheoryOfChange /> */}

      {/* SECTION FOUR */}
      <div className="w-full">
        {/* <BehaviouralSection /> */}
      </div>
      <div className="w-full bg-[#303D40] pt-20 py-16 flex justify-center">
        <MeetFilMakers />
      </div>
      <div className="w-full bg-[#303D40] px-4 sm:px-4 md:px-10 lg:px-16">
        <div className="w-full bg-[#374449] sm:px-4 md:px-12 lg:px-16 sm:py-8 md:py-14 lg:py-22 rounded-lg">
          {/* <GalleryGrid /> */}
        </div>
      </div>

      <div className="w-full bg-[#303D40] pt-10">
        <div
          className="w-full bg-no-repeat bg-cover bg-center h-16 md:h-40 lg:h-56 "
          style={{
            backgroundImage: `url('/footerWave.svg')`,
          }}
        ></div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
