import Banner from "@/components/landing-page/Banner";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import MatchesPerDay from "@/components/matches-per-day";

export async function generateMetadata({ params }) {
  const { date } = await params; // Await the params object

  return {
    title: `Matches on ${date} - DayNightCricket`,
    description: `Check out the cricket matches scheduled on ${date}, live scores, and match details on DayNightCricket.`,
    keywords: `Check out the cricket matches scheduled on ${date}, live scores, and match details on DayNightCricket.`,
  };
}

export default async function Page({ params }) {
  const { date } = await params; // Await the params object

  return (
    <>
      <Banner />
      <Header badge={date} active="Matches" page={date} />
      <MatchesPerDay date={date} />
      <Footer />
    </>
  );
}
