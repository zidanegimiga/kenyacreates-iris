"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KenyaCreatesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/kenyacreates");
  }, []);

  return <div className="w-screen relative"></div>;
}
