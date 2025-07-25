"use client";

import cricketService from "@/services/cricketService";
import { useEffect, useState } from "react";

export default function Series() {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    cricketService.fetchSeriesList(setSeriesList);
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-IN", options);
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Current Series
          </h2>
          <p className="mt-3 text-base text-gray-500">
            Stay updated with all active international and domestic series
            across formats — explore ongoing cricket action worldwide.
          </p>
        </div>

        {/* Series Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 p-0 lg:p-12">
          {seriesList.length === 0 ? (
            <p className="text-gray-500">No upcoming series available.</p>
          ) : (
            seriesList.map((series) => (
              <div
                key={series.id}
                className="border border-gray-200 px-6 py-4 hover:shadow-sm transition bg-white rounded-sm flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {series.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {formatDate(series.startDate)} → {series.endDate}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  {series.test > 0 && <span>⚡ {series.test} Test</span>}
                  {series.odi > 0 && <span>⚡ {series.odi} ODI</span>}
                  {series.t20 > 0 && <span>⚡ {series.t20} T20</span>}
                  {series.matches > 0 && (
                    <span>🎯 {series.matches} Matches</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
