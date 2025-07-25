"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Banner from "@/components/landing-page/Banner";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import UploadFile from "@/components/upload-file";
import { Suspense, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";

function UploadComponent() {
  const router = useRouter();
  const params = useSearchParams();
  const date = params.get("date");
  const { user, loader } = useContext(AppContext);

  useEffect(() => {
    if (!user && !loader) {
      router.push("/login?page=register");
    }
  }, [user, loader]);

  return (
    <div>
      <Banner />
      <Header badge={date} active="Register" />
      <UploadFile />
      <Footer />
    </div>
  );
}

export default function Upload() {
  return (
    <Suspense>
      <UploadComponent />
    </Suspense>
  );
}
