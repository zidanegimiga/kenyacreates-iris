"use client";

import { useRouter } from "next/navigation";
import { getActiveUser, logout } from "@/lib/auth";
import { LogOut, Globe, ArrowRight, Layout } from "lucide-react";
import { useEffect, useState } from "react";

type Site = {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
};

const SITES: Site[] = [
  {
    id: "kenyacreates",
    name: "Kenya Creates",
    description: "Creative economy & filmmakers showcase",
    previewImage: "/logo.png",
  },
];

export default function CMSSites() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = getActiveUser();
    if (!user) router.push("/");
    setUsername(user);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] animate-blob rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] animate-blob animation-delay-2000 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        {/* --- Header Section --- */}
        <header className="mb-16 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-400 mb-2">
              <Layout size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">CMS Dashboard</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Welcome back, <span className="capitalize text-teal-400">{username || "Editor"}</span>
            </h1>
            <p className="mt-3 text-lg text-slate-400">Select a workspace to manage your content.</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </header>

        {/* --- Sites Grid --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SITES.map((site) => (
            <div
              key={site.id}
              onClick={() => router.push(`/cms/editor/${site.id}`)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 transition-all hover:border-teal-500/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-teal-500/10"
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
                {site.previewImage ? (
                  <img
                    src={site.previewImage}
                    alt={site.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-800">
                    <Globe size={40} className="text-slate-600" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white transition-colors group-hover:text-teal-400">
                    {site.name}
                  </h2>
                  <ArrowRight size={20} className="translate-x-[-10px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-teal-400" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {site.description}
                </p>
              </div>
              
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-500/0 via-transparent to-teal-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}