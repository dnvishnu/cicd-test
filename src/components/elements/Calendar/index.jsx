"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar({ setIsModalOpen, activeDate }) {
  const router = useRouter();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [isMonthOpen, setIsMonthOpen] = useState(false); // Track month dropdown state
  const [isYearOpen, setIsYearOpen] = useState(false); // Track year dropdown state

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectMonth = (month) => {
    setCurrentMonth(month);
    setIsMonthOpen(false); // Close the dropdown after selection
  };

  const handleSelectYear = (year) => {
    setCurrentYear(year);
    setIsYearOpen(false); // Close the dropdown after selection
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty slots for days before the first day
  }
  for (let i = 1; i <= daysInMonth(currentMonth, currentYear); i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];
  for (let i = today.getFullYear(); i >= 2000; i--) {
    years.push(i);
  }

  const handleSelectDay = (day) => {
    const formattedDate = `${String(day.getDate()).padStart(2, "0")}-${String(
      day.getMonth() + 1
    ).padStart(2, "0")}-${day.getFullYear()}`;
    router.push(`/${formattedDate}`);
    setIsModalOpen(false);
  };

  return (
    <div className="w-[380px] p-6 bg-white rounded-lg shadow-lg">
      {/* Header with Month and Year */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Month Filter Flyout */}
        <div className="relative w-1/2">
          <button
            className="w-full text-sm font-medium text-gray-800 bg-gray-100 rounded-lg py-2 px-3 text-left focus:outline-none"
            onClick={() => setIsMonthOpen((prev) => !prev)} // Toggle month dropdown
          >
            {months[currentMonth]}
          </button>
          {isMonthOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg grid grid-cols-4 gap-2 p-3 max-h-[300px] min-w-[350px] overflow-auto">
              {months.map((month, idx) => (
                <button
                  key={month}
                  onClick={() => handleSelectMonth(idx)}
                  className={classNames(
                    "text-sm text-gray-900 px-3 py-2 rounded-md hover:bg-indigo-500 hover:text-white",
                    currentMonth === idx
                      ? "bg-indigo-500 text-white"
                      : "bg-white"
                  )}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Filter Flyout */}
        <div className="relative w-1/2">
          <button
            className="w-full text-sm font-medium text-gray-800 bg-gray-100 rounded-lg py-2 px-3 text-left focus:outline-none"
            onClick={() => setIsYearOpen((prev) => !prev)} // Toggle year dropdown
          >
            {currentYear}
          </button>
          {isYearOpen && (
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg grid grid-cols-5 gap-2 p-3 max-h-[400px] min-w-[350px] overflow-auto">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleSelectYear(year)}
                  className={classNames(
                    "text-sm text-gray-900 px-3 py-2 rounded-md hover:bg-indigo-500 hover:text-white",
                    currentYear === year
                      ? "bg-indigo-500 text-white"
                      : "bg-white"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-xs font-semibold text-center text-gray-500 mb-4">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            type="button"
            disabled={!day || day > today}
            onClick={() => {
              day && setSelectedDate(day);
              handleSelectDay(day);
            }}
            className={classNames(
              "w-10 h-10 rounded-full text-base",
              day
                ? "text-gray-900 hover:bg-indigo-500 hover:text-white"
                : "text-gray-300 cursor-not-allowed",
              day &&
                day.toDateString() === selectedDate.toDateString() &&
                "bg-indigo-500 text-white"
            )}
          >
            {day ? day.getDate() : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
