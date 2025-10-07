import Image from "next/image";
import styles from "./Hero.module.css";
import cn from "classnames";
import VideoPlayer from "./VideoPlayer";

export default function HeroSection() {
  return (
    <div className="w-full text-center">
      <div className="w-full flex justify-center items-center">
        <Image
        src={'/initialText.png'}
        alt="Story"
        width={530}
        height={93}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="inline-block">
          {/* <p
            className="font-myona text-5xl uppercase whitespace-nowrap"
            style={{
              fontFamily: "Myona-Sans",
            }}
          >
            African Storytelling
          </p> */}
          <Image
            alt="African Storytelling"
            src="/TextVector.svg"
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center p-4 mt-10">
        <Image
          src={"/hero.png"}
          alt="African Storytelling"
          width={1136}
          height={412}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <p className="font-gilroy font-light text-xl text-center max-w-[800px] my-10">
          Kenya Creates is a storytelling initiative dedicated to reimagining
          how Kenyan youth talk about their bodies and health. We move beyond
          legalese and jargon to embrace a language that’s deeply personal,
          relatable, and rooted in our local history.
        </p>
      </div>

      <div className="w-full">
        <section className="relative flex flex-col md:flex-row items-center justify-between bg-[#C2670C] text-white overflow-hidden h-[300px] md:h-[500px]">
          <div className="w-full md:w-2/5 z-10 p-4 md:p-6 md:pt-16 md:pl-12 flex flex-col justify-center h-full">
            <h2
              className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
              style={{ fontFamily: "Myona Sans" }}
            >
              OUR VISION
            </h2>
            <p className="text-base md:text-xl leading-6 md:leading-7 text-left">
              We believe young people deserve to lead conversations about their
              lives. By shifting the focus from policy-driven rhetoric to
              authentic, human stories, we center the real emotions of grappling
              with love, sex, relationships, and body issues from the Kenyan
              youth perspective. This shift moves the conversation to higher
              ground.
            </p>
          </div>
          <div className="w-full md:w-3/5 h-full relative">
            <Image
              src="/vision.png"
              alt="Background pattern"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <Image
              src="/group.png"
              alt="Foreground group"
              width={696}
              height={494}
              className="absolute bottom-0 md:bottom-0 right-2 md:right-8 z-10"
            />
          </div>
        </section>

        <div className="w-full">
          <div
            className={cn(
              "relative flex flex-col md:flex-row items-center justify-between text-white overflow-hidden py-5 md:py-20 h-auto md:h-[70vh]",
              ""
            )}
          >
            <div className="w-full md:w-1/2 px-2 md:px-10 py-2 md:py-5">
              <VideoPlayer
                url="https://www.youtube.com/watch?v=Gw1OQESCbzw"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/2 z-10 p-4 md:p-6 md:pt-16 md:pl-12 flex flex-col justify-center h-full ">
              <h2
                className="text-2xl md:text-4xl mb-2 md:mb-4 font-bold text-left"
                style={{ fontFamily: "Myona Sans" }}
              >
                OUR Goal
              </h2>
              <p className="text-base text-left md:text-xl leading-6 md:leading-7">
                Kenya Creates is building a bridge between what’s unsaid and
                what needs to be shared. Our goal is simple:{" "}
                <span className="font-bold">
                  to create a culture where health, love, and self-respect are
                  celebrated without judgment.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
