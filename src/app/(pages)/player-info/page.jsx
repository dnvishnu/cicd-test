"use client";

import { useState } from "react";
import Header from "@/components/landing-page/Header";
import playerData from "./player_info_data.json";
import Banner from "@/components/landing-page/Banner";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const formats = ["test", "odi", "t20", "ipl"];

const StatTable = ({ stats, fn }) => {
  const statLabels = Array.from(
    new Set(stats.filter((s) => s.fn === fn).map((s) => s.stat.trim()))
  );

  return (
    <div className="overflow-auto border rounded-xl">
      <table className="min-w-full text-sm text-center">
        <thead className="bg-gray-100 text-gray-800 font-semibold rounded-t-2xl">
          <tr>
            <th className="px-4 py-3 border border-gray-300">Format</th>
            {statLabels.map((label) => (
              <th key={label} className="px-4 py-3 border border-gray-300">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formats.map((format) => {
            const statValues = stats.filter(
              (s) => s.fn === fn && s.matchtype === format
            );
            return (
              <tr key={format} className="hover:bg-gray-50 text-gray-700">
                <td className="px-4 py-3 font-medium border border-gray-200">
                  {format.toUpperCase()}
                </td>
                {statValues.map((s, idx) => (
                  <td key={idx} className="px-4 py-3 border border-gray-200">
                    {s.value.trim()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function PlayerInfo() {
  const {
    name,
    dateOfBirth,
    role,
    battingStyle,
    placeOfBirth,
    country,
    playerImg,
    stats,
  } = playerData;

  const [activeTab, setActiveTab] = useState("batting");

  return (
    <>
      <Banner />
      <Header badge="Player" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Profile Card */}
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border">
          <img
            src={playerImg}
            alt={name}
            className="w-32 h-32 rounded-xl object-cover border border-gray-200"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
              <p><strong>Date of Birth:</strong> {formatDate(dateOfBirth)}</p>
              <p><strong>Role:</strong> {role}</p>
              <p><strong>Batting Style:</strong> {battingStyle}</p>
              <p><strong>Country:</strong> {country}</p>
              <p><strong>Place of Birth:</strong> {placeOfBirth}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-6 border-b mb-6">
            <button
              onClick={() => setActiveTab("batting")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "batting"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Batting Stats
            </button>
            <button
              onClick={() => setActiveTab("bowling")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "bowling"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Bowling Stats
            </button>
          </div>

          {/* Table Section */}
          {activeTab === "batting" ? (
            <StatTable stats={stats} fn="batting" />
          ) : (
            <StatTable stats={stats} fn="bowling" />
          )}
        </div>
      </div>
    </>
  );
}
