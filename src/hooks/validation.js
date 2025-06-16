"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";

export const userValidation = () => {
  const router = useRouter();
  const { user, loader } = useContext(AppContext);

  useEffect(() => {
    if (loader) return;

    if (!loader && !user) {
      router.push("/");
    }
  }, [loader, user, router]);
};
