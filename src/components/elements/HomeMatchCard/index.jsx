"use client";

import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeMatchCard({ url, data }) {
  const router = useRouter();
console.log("inside home match card")
  const handleMatchClick = () => {
    router.push(url);
  };

  console.log(data)

  return (
    <div
      className="w-96 bg-white rounded-sm border border-gray-300 cursor-pointer transition-all flex-shrink-0"
      onClick={handleMatchClick}
    >
      {/* Match Header */}
      <div className="p-2 bg-gray-200 border-b text-center rounded-t-sm">
        <p className="text-[10px] font-medium text-gray-900 uppercase truncate">
          {data.name || "Match Details"}
        </p>
      </div>

      {/* Teams & Scores */}
      <div className="p-1 space-y-1">
        {data.score?.map((score, i) => {
          // Find the corresponding team from teamInfo if available, otherwise use teams array
          const team =
            data.teamInfo?.find((team) => score.inning.includes(team.name)) ||
            null;

          const teamName =
            team?.name ||
            data.teams?.find((t) => score.inning.includes(t)) ||
            "-";

          return (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {team?.img ? (
                  <img
                    src={team.img}
                    alt={team.shortname}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-semibold text-sm">
                    {teamName.charAt(0)}
                  </span>
                )}
                <span className="text-[13px] font-medium text-gray-700 truncate">
                  {teamName}
                </span>
              </div>
              <div className="text-[15px] font-bold text-gray-900 text-right">
                {score ? `${score.r}/${score.w} (${score.o} ov)` : "-/- (- ov)"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Match Status */}
      <div className="p-1 text-center rounded-b-lg">
        <span
          className={classNames(
            "text-[11px] font-semibold px-3 py-[4px] rounded-full border border-gray-200 text-gray-900"
          )}
        >
          {data.status}
        </span>
      </div>
    </div>
  );
}
