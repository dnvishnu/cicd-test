import Banner from "@/components/landing-page/Banner";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import MatchDetails from "@/components/match-details";

export async function generateMetadata({ params, searchParams }) {
  const { seriesId, matchId } = await params;
  const allSearchParams = await searchParams;

  const date = allSearchParams.date;
  const version = allSearchParams.version || "v2";

  let matchName = "Match Details";

  if (matchId && date) {
    const bucketUrl = `https://storage.googleapis.com/daynightcricket/${date}.json?t=${Date.now()}`;
    try {
      const response = await fetch(bucketUrl);
      const matches = await response.json();

      if (version === "v2") {
        const match = matches.find((m) => m.id === matchId);
        if (match) matchName = match.name;
      } else if (version === "v1") {
        const match = matches.find(
          (m) => m.additional_data?.main_ids?.[1] === matchId
        );
        if (match) {
          matchName = `${match.additional_data.TeamName[0]} vs ${match.additional_data.TeamName[1]}`;
        }
      }
    } catch (error) {
      console.error("Metadata fetch error:", error);
    }
  }

  return {
    title: `${matchName} - DayNightCricket`,
    description: `Live match: ${matchName}. Stay updated with live scores, match status, and team details.`,
    keywords: `live match, ${matchName}, cricket scores, daynightcricket`,
  };
}

export default async function Page({ params, searchParams }) {
  const { seriesId, matchId } = await params;
  const allSearchParams = await searchParams;

  const date = allSearchParams.date;
  const version = allSearchParams.version || "v2";

  return (
    <>
      <Banner />
      <Header badge={date} active="Matches" page={`match/${seriesId}/${matchId}?date=${date}`}/>
      <MatchDetails
        version={version}
        date={date}
        seriesId={seriesId}
        matchId={matchId}
      />
      <Footer />
    </>
  );
}
