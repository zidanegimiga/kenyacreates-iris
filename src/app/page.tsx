import HeroSection from "./components/Hero";
import Navigation from "./components/Navigation";
import styles from "./components/Hero.module.css";
import cn from "classnames";
import BehaviouralSection from "./components/BehaviouralSection";
import MeetFilMakers from "./components/Filmakers";
import GalleryGrid from "./components/GalleryGrid";
import Footer from "./components/Footer";

export default function KenyaCreatesPage() {
  return (
    <div className="w-screen relative">
      <div className={cn(styles.heroWrapper, "w-full")}>
        <div className={cn("pt-24", styles.bgWrapper)}>
          <Navigation />
          <HeroSection />
        </div>
      </div>

      {/* SECTION THREE */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-stretch">
        <div className="w-full lg:w-1/2 bg-[url('/theoryofchange.jpg')] bg-cover bg-center relative grayscale hover:grayscale-0 h-[70vh] lg:h-screen">
          <p className="font-bold text-sm md:text-lg absolute bottom-2 md:bottom-10 left-2 md:left-4 text-white">
            Photo credit: Home by Adelle Onyango Behind the Scenes
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col lg:h-screen">
          <div className="w-full bg-[#FF6E19] p-4 md:p-14 lg:h-1/2">
            <p
              className="text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "Myona-Sans" }}
            >
              Theory of Change: The Power of Storytelling Shapes Culture
            </p>
            <p className="text-base md:text-xl font-light mt-2 md:mt-4">
              Kenya Creates was anchored in the understanding that behavior
              change in the SRHR space does not begin with information alone. It
              begins with recognition. When individuals, especially young
              people, see themselves reflected in complex, culturally attuned
              stories, they begin to engage differently. They reflect, question,
              share, and in some cases, reimagine what is possible. This
              campaign positioned storytelling as a civic and emotional access
              point to shift perceptions, foster dialogue, and strengthen demand
              for accurate, inclusive, and affirming SRHR information and
              services.
            </p>
          </div>
          <div className="w-full bg-[#3A7E53] p-4 md:p-14 lg:h-1/2">
            <p className="text-base md:text-xl font-light w-full">
              The theory of change acknowledged the diverse environments where
              these stories would land: homes, classrooms, festivals, and social
              media feeds. Each space carries different norms and framings,
              shaped by moral, cultural, medical, and legal traditions. In
              Kenya, these framings often overlap. Religious discourse
              prescribes chastity, cultural norms frame sex as taboo, and
              biomedical knowledge remains technical and distant from lived
              experience. SRHR rights are protected in policy but continue to
              face resistance when interpreted as foreign or disruptive to
              established values.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION FOUR */}
      <div className="w-full">
        <BehaviouralSection />
      </div>
      <div className="w-full bg-[#303D40] pt-20 py-16 flex justify-center">
        <MeetFilMakers />
      </div>
      <div className="w-full bg-[#303D40] px-4 sm:px-4 md:px-10 lg:px-16">
        <div className="w-full bg-[#374449] sm:px-4 md:px-12 lg:px-16 sm:py-8 md:py-14 lg:py-22 rounded-lg">
          <GalleryGrid />
        </div>
      </div>

      <div className="w-full bg-[#303D40] pt-10">
        <div
          className="w-full bg-no-repeat bg-cover bg-center h-16 md:h-40 lg:h-56 "
          style={{
            backgroundImage: `url('/footerWave.svg')`,
          }}
        ></div>
        <Footer/>
      </div>
    </div>
  );
}

// <section>
//   <h2 className="text-2xl font-bold mb-4">Gilroy Font Weights</h2>
//   <div className="space-y-2">
//     <p className="font-gilroy font-thin text-xl">Thin (100)</p>
//     <p className="font-gilroy font-ultralight text-xl">UltraLight (200)</p>
//     <p className="font-gilroy font-light text-xl">Light (300)</p>
//     <p className="font-gilroy font-normal text-xl">Regular (400)</p>
//     <p className="font-gilroy font-medium text-xl">Medium (500)</p>
//     <p className="font-gilroy font-semibold text-xl">SemiBold (600)</p>
//     <p className="font-gilroy font-bold text-xl">Bold (700)</p>
//     <p className="font-gilroy font-extrabold text-xl">ExtraBold (800)</p>
//     <p className="font-gilroy font-black text-xl">Black (900)</p>
//     <p className="font-gilroy font-heavy text-xl">Heavy (950)</p>
//   </div>
// </section>

// <section>
//   <h2 className="text-2xl font-bold mb-4">Gilroy Italic</h2>
//   <div className="space-y-2">
//     <p className="font-gilroy font-normal italic text-xl">Regular Italic</p>
//     <p className="font-gilroy font-bold italic text-xl">Bold Italic</p>
//     <p className="font-gilroy font-light italic text-xl">Light Italic</p>
//   </div>
// </section>

// <section>
//   <h2 className="text-2xl font-bold mb-4">Myona Sans</h2>
//   <p className="font-myona text-xl">Myona Sans Regular</p>
// </section>
