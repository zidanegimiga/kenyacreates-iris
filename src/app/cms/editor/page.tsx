// src/app/cms/editor/page.tsx
import HeroSection from "@/app/components/HeroSection";

export default function CMSEditor() {
  return (
    <div className="min-h-screen bg-[#313d41be]">
      <HeroSection />
      {/* Add other editable sections here */}
    </div>
  );
}

export const metadata = {
  title: "CMS Editor",
};