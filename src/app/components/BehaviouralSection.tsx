"use client";

export default function BehaviouralSection() {
  return (
    <div className="h-full bg-[#C22520] text-white w-full pb-20">
      <div className="w-full px-16 py-20">
        <h1 className="text-4xl md:text-5xl font-light  text-[#FFDCC8]">
          Kenya Creates:
        </h1>
        <h1 className="font-bold mb-6 text-5xl text-[#FFDCC8] ">
          Reimagining Behavioural Change Through Storytelling and Recognition
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-4 border-y-1 border-r-1 border-white pl-16 pr-20 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            A New Paradigm for Social Change
          </h2>
          <p className="text-xl md:text-xl">
            The campaign was grounded in the belief that behavioral change
            begins with recognition, not instruction. When audiences see their
            realities reflected in honest, locally rooted narratives, they begin
            to question, talk, and reimagine what is possible.
          </p>
        </div>

        <div className=" border-y-1 border-white px-20 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Storytelling as Intervention
          </h2>
          <p className="text-xl md:text-xl">
            Kenya Creates positioned storytelling as an intervention rooted in
            recognition rather than instruction. Stories open emotional entry
            points. They offer language, reflect silences, and spark
            self-inquiry. The campaign’s Theory of Change was grounded in four
            shifts: reflection through storytelling, conversation through
            dialogue, connection through trusted intermediaries, and action
            through advocacy and tools. This approach recognized that engagement
            happens in layered spaces: homes, schools, churches, festivals, the
            media, and social media timelines.
          </p>
        </div>

        <div className="border border-r-0 border-white pr-20 pl-10 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Navigating Digital Noise and Cultural Silences
          </h2>
          <p className="text-xl md:text-xl">
            The urgency of this work is grounded in overlapping realities. Young
            Kenyans are surrounded by a fast-growing ecosystem of digital
            content that includes influencers, memes, hookup apps, and informal
            sex education. These voices offer a mix of empowerment,
            misinformation, moral judgment, and aspiration. At the same time,
            national conversations around SRHR remain framed by religious,
            cultural, and biomedical language, often leaving out the emotional
            and social contexts in which young people form their understanding
            of sex, consent, and self-worth. Formal sex education remains
            limited or inconsistent across the country.
          </p>
        </div>
      </div>
    </div>
  );
}
