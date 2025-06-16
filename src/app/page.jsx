"use client";
import Hero from "@/components/landing/Hero";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user, loader } = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (!loader && user) {
      router.push("/chat");
    }
  }, [user, loader]);

  return (
    <>
      <Hero />
    </>
  );
}
