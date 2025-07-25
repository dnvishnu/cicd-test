import React from "react";

export default function BattingTable({ battingData, matchData }) {
  if (!battingData || battingData.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <div className="sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between bg-gray-500 text-white py-3 px-4 rounded-none lg:rounded-sm">
          <span className="text-lg font-semibold">
            {matchData.inning.replace("1", "")}
          </span>
          <span className="text-lg font-semibold">
            Score: {matchData.r}{" "}
            {matchData.w != 10 && <span>/{matchData.w}</span>}
          </span>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Batter
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      Dismissal
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Runs
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Balls
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      4s
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      6s
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      SR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {battingData.map((player, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-0">
                        {player.batsman.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player["dismissal-text"] || "Not Out"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm font-semibold text-gray-900 text-center">
                        {player.r}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.b}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player["4s"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player["6s"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.sr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
