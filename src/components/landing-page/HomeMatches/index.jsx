"use client";
import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import "@/styles/HomeMatches.css";
import HomeMatchCard from "@/components/elements/HomeMatchCard";

export default function HomeMatches({ matches }) {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };
  return (
    <>
      {matches.length > 0 ? (
        <div className="w-full flex flex-col items-center mt-0">
          <div className="relative w-full max-w-6xl mx-auto">
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <ArrowLeftIcon className="w-4 h-4 text-white stroke-current" />
            </button>

            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-3 py-4 px-4 hide-scrollbar"
            >
              {matches.map((data, index) => (
                <HomeMatchCard
                  key={index}
                  data={data}
                  url={`/match/${data.series_id}/${data.id}?date=${data.date
                    .split("-")
                    .reverse()
                    .join("-")}`}
                />
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <ArrowRightIcon className="w-4 h-4 text-white stroke-current" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
