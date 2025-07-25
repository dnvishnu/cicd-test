"use client";

import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function MatchCard(props) {
  const router = useRouter();
  const { url, data, date } = props;

  const handleMatchClick = () => {
    router.push(url);
  };

  return (
    <li
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all transform cursor-pointer backdrop-blur-md"
      onClick={handleMatchClick}
    >
      {/* Match Name */}
      <div className="p-3 flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-100 border-b border-gray-200">
        <div className="font-semibold text-gray-800 text-[15px] truncate">
          {data.name}
        </div>
      </div>

      {/* Score Section */}
      <dl className="p-4 space-y-3 text-gray-700">
        {[...(data.score || []), ...data.teams] // Prioritize teams in order of scores
          .reduce((orderedTeams, item) => {
            if (typeof item === "string") {
              // If it's a team name, check if it was already included via score
              if (!orderedTeams.some((team) => team.name === item)) {
                const teamInfo = data.teamInfo?.find((t) => t.name === item);
                orderedTeams.push({
                  name: item,
                  shortname: teamInfo?.shortname || "-",
                  img: teamInfo?.img || null,
                  score: null,
                });
              }
            } else {
              // If it's a score object, find the corresponding team
              const team = data.teamInfo?.find((t) =>
                item.inning.includes(t.name)
              );
              orderedTeams.push({
                name: team?.name || item.inning.split(" Inning")[0],
                shortname: team?.shortname || "-",
                img: team?.img || null,
                score: item,
              });
            }
            return orderedTeams;
          }, [])
          .map((team, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              {/* Team Info */}
              <div className="flex items-center space-x-3 min-w-[140px]">
                {team.img ? (
                  <img
                    src={team.img}
                    alt={team.shortname}
                    className="w-6 h-6 rounded-full shadow-sm"
                  />
                ) : (
                  <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm shadow-sm">
                    {team.shortname !== "-"
                      ? team.shortname.charAt(0)
                      : team.name.charAt(0)}
                  </span>
                )}

                <span className="text-sm font-medium text-gray-800 truncate">
                  {team.name}
                </span>
              </div>

              {/* Score or "Yet to Bat" */}
              <div className="text-[15px] font-semibold min-w-[100px] text-gray-900 text-right">
                {team.score
                  ? `${team.score.r}/${team.score.w} (${team.score.o} ov)`
                  : "Yet to Bat"}
              </div>
            </div>
          ))}

        {/* Match Status (Always Visible) */}
        <div className="flex justify-between items-center mt-2">
          <dd className="flex items-center gap-x-2">
            <div className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600 ring-1 ring-blue-300">
              {data.status || "Status Unavailable"}
            </div>
          </dd>
        </div>
      </dl>

      {/* Date & Venue */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-b-xl text-gray-600 text-xs font-medium">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 text-gray-500" />
          <span>{data.date}</span>
        </div>
        <span className="truncate text-gray-700 font-medium">
          {data.venue || "-"}
        </span>
      </div>
    </li>
  );
}
