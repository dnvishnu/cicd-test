"use client";

import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";

export default function DateNavigation() {
  const router = useRouter();
  const dates = Array.from({ length: 4 }, (_, i) => {
    const date = subDays(new Date(), i);
    return {
      id: i,
      formatted: format(date, "dd-MM-yyyy"),
      display: format(date, "EEE, dd MMM"),
    };
  });

  const handleDateClick = (date) => {
    router.push(`/${date}`);
  };

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {dates.map((date) => (
            <div
              key={date.id}
              onClick={() => handleDateClick(date.formatted)}
              className="group bg-white/60 backdrop-blur-md shadow-md hover:shadow-xl border border-gray-200 rounded-sm px-4 py-6 cursor-pointer transition duration-300 ease-in-out hover:bg-white"
            >
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {date.display}
                </p>
                <p className="text-sm text-gray-600 mt-1">Matches</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
