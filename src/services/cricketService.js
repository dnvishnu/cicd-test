import axios from "axios";
import { marked } from "marked";

const fetchMatchSummaries = async (matches, setSummaries) => {
  const fetchedSummaries = await Promise.all(
    matches.map(async (match) => {
      const { id: matchId, series_id: seriesId, date } = match;
      const formattedDate = date.split("-").reverse().join("-");
      const summaryUrl = `https://storage.googleapis.com/daynightcricket/${formattedDate}/${seriesId}/${matchId}_summary.txt`;

      try {
        const response = await axios.get(summaryUrl, { responseType: "text" });
        const cleanSummary = marked(response.data)
          .replace(/<[^>]*>?/gm, "")
          .trim();

        if (cleanSummary) {
          return {
            ...match,
            summary: cleanSummary.slice(0, 220) + "...",
          };
        }
      } catch (_) {
        // silently ignore failed summary
      }

      return null;
    })
  );

  const filteredSummaries = fetchedSummaries.filter(Boolean);
  setSummaries(filteredSummaries);
};

const fetchRecentMatches = async (setMatches) => {
  const fetchedMatches = [];
  let validDayCount = 0;
  let currentDate = new Date();

  const fetchDataForDate = async (date) => {
    const formattedDate = date
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
    const bucketUrl = `https://storage.googleapis.com/daynightcricket/${formattedDate}.json?t=${Date.now()}`;

    try {
      const response = await axios.get(bucketUrl);
      const data = response.data;

      if (Array.isArray(data) && data.length > 0 && data[0].id) {
        const filtered = data.filter(
          (match) => match.status !== "Match not started"
        );
        if (filtered.length > 0) {
          return filtered;
        }
      }
    } catch (_) {
      // silently ignore fetch error
    }

    return null;
  };

  while (validDayCount < 2) {
    const matches = await fetchDataForDate(currentDate);
    if (matches) {
      fetchedMatches.push(...matches);
      validDayCount++;
    }
    currentDate.setDate(currentDate.getDate() - 1);
  }

  setMatches(fetchedMatches);
};

const fetchUpcomingMatches = async (setMatches) => {
  const res = await fetch(
    "https://storage.googleapis.com/daynightcricket/upcoming/matches.json"
  );
  const data = await res.json();

  const upcoming = data
    .filter((match) => match.status === "Match not started")
    .sort(
      (a, b) =>
        new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
    );

  setMatches(upcoming);
};

const fetchSeriesList = async (setSeriesList) => {
  const res = await fetch(
    "https://storage.googleapis.com/daynightcricket/upcoming/series.json"
  );
  const data = await res.json();

  const filtered = data.sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  setSeriesList(filtered);
};

const fetchMatchesPerDay = async (date, setMatches) => {
  const bucketUrl = `https://storage.googleapis.com/daynightcricket/${date}.json?t=${Date.now()}`;
  const response = await fetch(bucketUrl);

  if (!response.ok) {
    setMatches([]);
    return;
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    const combinedMatches = data.map((item) => ({
      ...item,
      version: item.id ? "v2" : "v1",
    }));

    setMatches(combinedMatches);
  } else {
    setMatches([]);
  }
};

const cricketService = {
  fetchMatchSummaries,
  fetchRecentMatches,
  fetchUpcomingMatches,
  fetchSeriesList,
  fetchMatchesPerDay
};

export default cricketService;
