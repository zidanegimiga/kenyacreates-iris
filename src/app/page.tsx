import HeroSection from "./components/Hero";
import Navigation from "./components/Navigation";
import styles from "./components/Hero.module.css";
import cn from "classnames";

export default function TestFontsPage() {
  return (
    <div className="w-full relative">
      <div className={cn(styles.heroWrapper, "w-full")}>
        <div className={cn("pt-24", styles.bgWrapper)}>
          <Navigation />
          <HeroSection />
        </div>
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
