"use client";
import { useEffect, useState } from "react";
import MatchCard from "../elements/MatchCard";
import cricketService from "@/services/cricketService";

export default function MatchesPerDay(props) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    cricketService.fetchMatchesPerDay(props.date, setMatches)
  }, [props.date]);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 mb-60"
    >
      {matches.map((data, index) => (
        <MatchCard
          key={index}
          date={props.date}
          data={data}
          url={`/match/${data.series_id}/${data.id}?date=${props.date}`}
        />
      ))}
    </ul>
  );
}
