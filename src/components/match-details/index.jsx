"use client";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import BowlingTable from "../elements/BowlingTable";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import BattingTable from "../elements/BattingTable";

function MatchDetails({ version, date, seriesId, matchId }) {
  const { user } = useContext(AppContext);
  const [summary, setSummary] = useState("");
  const [matchName, setMatchName] = useState("");
  const [matchData, setMatchData] = useState([]);

  const isAuthorized =
    user?.email === "prashantk@dataknobs.com" ||
    user?.email === "vishnu.dn@dataknobs.com";

  useEffect(() => {
    const fetchMatchData = async () => {
      const oldBucketUrl = `https://storage.googleapis.com/daynightcricket/${date}.json?t=${new Date().getTime()}`;
      const response = await fetch(oldBucketUrl);
      const matches = await response.json();

      const match = matches.find((m) => m.id === matchId);

      if (match) {
        setMatchName(match.name);
      }

      if (match && match.scorecard) {
        setMatchName(match.name);
        setMatchData(match);
      } else {
        // Use the new approach
        const newBucketUrl = `https://storage.googleapis.com/daynightcricket/${date}/${seriesId}/${matchId}.json?t=${new Date().getTime()}`;
        const newResponse = await fetch(newBucketUrl);
        const newMatch = await newResponse.json();

        if (newMatch) {
          setMatchName(newMatch.name);
          setMatchData(newMatch);
        }
      }
    };

    fetchMatchData();
  }, [date, matchId, seriesId, version]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        let textResponse = await fetch(
          `https://storage.googleapis.com/daynightcricket/${date}/${seriesId}/${matchId}_summary.txt?t=${new Date().getTime()}`
        );

        if (textResponse.ok) {
          const text = await textResponse.text();
          setSummary(text);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, [date, seriesId, matchId]);

  const handleRegenerate = async () => {
    if (isAuthorized) {
      const formattedDate = matchData.date.split("-").reverse().join("-");
      if (matchData) {
        const summaryPayload = {
          date: formattedDate,
          seriesId: matchData.series_id,
          matchId: matchData.id,
          data: JSON.stringify(matchData),
        };
        try {
          await toast.promise(
            axios.post(
              "https://kreate-backend-436124264408.us-central1.run.app/cricket/generate-summary",
              summaryPayload
            ),
            {
              pending: "Regenerating summary...",
              success: "Summary regenerated successfully!",
              error: "Failed to regenerate summary!",
            }
          );
        } catch (error) {
          console.error(error.message);
        }
      }
    } else {
      toast.error("You are not authorized");
    }
  };

  return (
    <div className="mx-auto max-w-7xl mb-60 mt-12">
      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-2 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <h3 className="max-w-xl text-balance text-1xl font-bold tracking-tight text-gray-700 sm:text-2xl lg:col-span-7">
            {matchName}
          </h3>
        </div>
      </div>
      <div>
        <BattingTable
          battingData={matchData?.scorecard?.[0]?.batting}
          matchData={matchData?.score?.[0]}
        />
        <BowlingTable bowlingData={matchData?.scorecard?.[0]?.bowling} />
        <BattingTable
          battingData={matchData?.scorecard?.[1]?.batting}
          matchData={matchData?.score?.[1]}
        />
        <BowlingTable bowlingData={matchData?.scorecard?.[1]?.bowling} />
      </div>

      {summary && (
        <div className="mt-16 bg-gray-50 p-3 lg:px-8 shadow-sm rounded-md relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Match Summary
            </h3>
            {isAuthorized && user && (
              <div className="group relative">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                >
                  <ArrowPathIcon className="w-5 h-5 text-gray-600" />
                </button>
                {/* Tooltip */}
                <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Regenerate
                </div>
              </div>
            )}
          </div>
          <div className="text-gray-700 leading-relaxed text-justify">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;
