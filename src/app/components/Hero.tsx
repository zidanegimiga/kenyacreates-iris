import Image from "next/image";
import styles from "./Hero.module.css";
import cn from "classnames";

export default function HeroSection() {
  return (
    <div className="w-full text-center">
      <p className="font-gilroy font-light text-xl">
        Rethinking who we are through
      </p>
      <div className="flex flex-col items-center justify-center">
        <p
          className="font-myona text-5xl uppercase"
          style={{
            fontFamily: "Myona-Sans",
          }}
        >
          African Storytelling
        </p>
        <Image
          alt="African Storytelling"
          src="/TextVector.svg"
          width={520}
          height={24}
        />
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
        <section className={styles.visionSection}>
          <div className={styles.textContainer}>
            <h2>OUR VISION</h2>
            <p>
              We believe young people deserve to lead conversations about their
              lives. By shifting the focus from policy-driven rhetoric to
              authentic, human stories, we center the real emotions of grappling
              with love, sex, relationships, and body issues from the Kenyan
              youth perspective. This shift moves the conversation to higher
              ground.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/vision.png" // Replace with your background image path
              alt="Background pattern"
              layout="fill"
              objectFit="cover"
              className={styles.backgroundImage}
            />
            <Image
              src="/group.png" // Replace with your foreground image path
              alt="Foreground group"
              width={696}
              height={494}
              className={styles.foregroundImage}
            />
          </div>
        </section>
      </div>


      <div className="w-full">
        
      </div>
    </div>
  );
}
