"use client";
import { useState, useEffect } from "react";
import Banner from "@/components/landing-page/Banner";
import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import UpcomingMatches from "@/components/landing-page/UpcomingMatches";
import Series from "@/components/landing-page/Series";
import Hero from "@/components/landing-page/Hero";
import MatchInsights from "@/components/landing-page/MatchInsights";
import cricketService from "@/services/cricketService";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    cricketService.fetchRecentMatches(setMatches);
  }, []);

  return (
    <>
      <Banner home={true} matches={matches}/>
      <Header badge="daynightcricket" active="Matches" page="" />
      <Hero />
      <UpcomingMatches />
      <Series />
      <MatchInsights matches={matches} />
      <Footer />
    </>
  );
}
