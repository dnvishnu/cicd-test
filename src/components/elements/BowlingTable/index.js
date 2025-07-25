import React from "react";

export default function BowlingTable({ bowlingData }) {
  if (!bowlingData || bowlingData.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Bowler
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Overs
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Maidens
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Runs
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Wickets
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      No Balls
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Wide Balls
                    </th>
                    <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">
                      Economy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bowlingData.map((player, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-0">
                        {player.bowler.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.o}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.m}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.r}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.w}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.nb}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.wd}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-center">
                        {player.eco}
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
