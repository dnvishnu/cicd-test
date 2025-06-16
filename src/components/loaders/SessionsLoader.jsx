import React from "react";

const placeholderArray = new Array(6).fill(null); // Show 6 placeholders

export default function SessionsLoader() {
  return (
    <ul role="list" className="space-y-4 px-2">
      {placeholderArray.map((_, index) => (
        <li
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-md bg-gray-800 px-4 py-3"
        >
          <div className="h-5 w-5 rounded bg-gray-600" />
          <div className="h-4 w-28 rounded bg-gray-600" />
        </li>
      ))}
    </ul>
  );
}
