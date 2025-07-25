"use client";

import Banner from "@/components/landing-page/Banner";
import Header from "@/components/landing-page/Header";
import React, { useEffect, useState } from "react";
import {
  LoaderCircle,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";

export default function SitemapPage() {
  const [sitemapData, setSitemapData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [loadingWeek, setLoadingWeek] = useState("");

  useEffect(() => {
    async function fetchMainSitemap() {
      const res = await fetch("/sitemap.xml");
      const xml = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");
      const locs = doc.getElementsByTagName("loc");

      const structured = {};

      Array.from(locs).forEach((loc) => {
        const url = loc.textContent;
        const match = url.match(/sitemaps\/(\d{4})-(\w+)-(\d+)\.xml/);
        if (match) {
          const [_, year, month, week] = match;
          if (!structured[year]) structured[year] = {};
          if (!structured[year][month]) structured[year][month] = {};
          structured[year][month][week] = {
            url,
            slug: `${year}-${month}-${week}.xml`,
            links: [],
            loaded: false,
          };
        }
      });

      setSitemapData(structured);
    }

    fetchMainSitemap();
  }, []);

  const toggleWeek = async (year, month, week) => {
    const key = `${year}-${month}-${week}`;
    const isOpen = expanded[key];

    if (!isOpen) {
      setExpanded((prev) => ({ ...prev, [key]: true })); // Expand first
      setLoadingWeek(key);
    } else {
      setExpanded((prev) => ({ ...prev, [key]: false })); // Collapse if already open
      return;
    }

    // Only fetch if not already loaded
    if (!sitemapData[year][month][week].loaded) {
      try {
        const slug = sitemapData[year][month][week].slug;
        const res = await fetch(`/sitemaps/${slug}`);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        const urls = Array.from(doc.getElementsByTagName("url")).map(
          (urlNode) => {
            const loc =
              urlNode.getElementsByTagName("loc")[0]?.textContent || "";
            const changefreq =
              urlNode.getElementsByTagName("changefreq")[0]?.textContent || "";
            const priority =
              urlNode.getElementsByTagName("priority")[0]?.textContent || "";
            return { loc, changefreq, priority, matchName: null };
          }
        );

        const dateToMatchMap = {};

        for (let url of urls) {
          const match = url.loc.match(
            /\/match\/[^/]+\/([^/?]+)\?date=([\d-]+)/
          );
          if (match) {
            const matchId = match[1];
            const date = match[2];
            if (!dateToMatchMap[date]) {
              try {
                const matchRes = await fetch(
                  `https://storage.googleapis.com/daynightcricket/${date}.json?t=${Date.now()}`
                );
                const json = await matchRes.json();
                dateToMatchMap[date] = json;
              } catch (e) {
                console.error("Failed to fetch match JSON for", date);
                dateToMatchMap[date] = [];
              }
            }

            const version = "v2";
            const matches = dateToMatchMap[date];
            const found =
              version === "v2"
                ? matches.find((m) => m.id === matchId)
                : matches.find(
                    (m) => m.additional_data?.main_ids?.[1] === matchId
                  );

            if (found) {
              url.matchName =
                version === "v2"
                  ? found.name
                  : `${found.additional_data.TeamName[0]} vs ${found.additional_data.TeamName[1]}`;
            }
          }
        }

        sitemapData[year][month][week].links = urls;
        sitemapData[year][month][week].loaded = true;
        setSitemapData({ ...sitemapData });
      } catch (err) {
        console.error("Failed to fetch weekly sitemap", err);
      } finally {
        setLoadingWeek("");
      }
    } else {
      setLoadingWeek(""); // just in case
    }
  };

  return (
    <>
      <Banner />
      <Header badge="sitemap" active="Matches" />

      <main className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            🗺️ Sitemap Overview
          </h1>

          {Object.entries(sitemapData).map(([year, months]) => (
            <section key={year} className="mb-20 mt-14">
              <h2 className="text-3xl font-semibold text-blue-700 mb-8 pb-3 border-gray-200">
                {year}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(months).map(([month, weeks]) => (
                  <div
                    key={month}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 capitalize mb-4 pb-2 border-gray-200">
                      {month}
                    </h3>

                    <div className="space-y-3">
                      {Object.entries(weeks).map(([week, weekData]) => {
                        const key = `${year}-${month}-${week}`;
                        const isOpen = expanded[key];
                        const isLoading = loadingWeek === key;

                        return (
                          <div key={week} className="border rounded-md">
                            <button
                              onClick={() => toggleWeek(year, month, week)}
                              className="w-full px-4 py-3 flex items-center justify-between text-left text-blue-600 font-medium hover:bg-blue-50 transition"
                            >
                              <span className="flex items-center">
                                {isOpen ? (
                                  <ChevronDown className="w-5 h-5 mr-2" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 mr-2" />
                                )}
                                Week {week}
                              </span>
                            </button>

                            {isOpen && (
                              <div className="px-5 pb-4 pt-1 text-sm text-gray-700 bg-gray-50 rounded-b-md">
                                {isLoading ? (
                                  <div className="text-gray-400 flex items-center mt-2">
                                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    Loading matches...
                                  </div>
                                ) : (
                                  <ul className=" mt-2 space-y-1">
                                    {weekData.links
                                      .slice(1)
                                      .map((link, index) => (
                                        <li key={index}>
                                          <a
                                            href={link.loc}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mb-2 text-gray-800 hover:text-blue-600 transition"
                                          >
                                            <LinkIcon className="w-4 h-4" />
                                            {link.matchName || link.loc}
                                          </a>
                                        </li>
                                      ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
