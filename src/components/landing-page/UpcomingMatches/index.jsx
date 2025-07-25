"use client";

import cricketService from "@/services/cricketService";
import { useEffect, useState } from "react";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);
  const matchesPerPage = 6;

  useEffect(() => {
    cricketService.fetchUpcomingMatches(setMatches);
  }, []);

  const formatIST = (gmtDateTime) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(gmtDateTime);
    return new Intl.DateTimeFormat("en-IN", options).format(date) + " IST";
  };

  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const startIndex = (page - 1) * matchesPerPage;
  const currentMatches = matches.slice(startIndex, startIndex + matchesPerPage);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Upcoming Matches
          </h2>
          <p className="mt-3 text-base text-gray-500">
            Get a quick look at all the upcoming fixtures, match timings, and
            series info — all updated in real time.
          </p>
        </div>

        {/* Match Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0 lg:p-12">
          {currentMatches.length === 0 ? (
            <p className="text-gray-500">No upcoming matches.</p>
          ) : (
            currentMatches.map((match) => (
              <div
                key={match.id}
                className="border border-gray-200 p-4 hover:shadow-sm transition rounded-sm bg-white flex flex-col space-y-2"
              >
                <div className="text-sm font-semibold text-gray-800">
                  {match.t1}{" "}
                  <span className="text-gray-500 font-medium">vs</span>{" "}
                  {match.t2}
                </div>

                <div className="text-sm text-gray-600">{match.series}</div>

                <div className="text-sm text-blue-600 font-medium">
                  {formatIST(match.dateTimeGMT)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 text-sm ${
                  page === i + 1
                    ? "text-white bg-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } rounded-sm`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
