import { FcLightAtTheEndOfTunnel, FcReadingEbook } from "react-icons/fc";

export default function ChatLoader() {
  const placeholders = Array(6).fill(null); // show 6 placeholder messages

  return (
    <div className="flex h-screen w-full flex-col bg-white text-black">
      <div className="w-full flex-1 overflow-y-auto pt-16">
        {placeholders.map((_, index) => (
          <div
            key={index}
            className={`flex w-full items-start gap-4 pb-6 pl-4 pr-4 pt-6 lg:pl-24 lg:pr-20 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            {index % 2 === 0 ? (
              <FcLightAtTheEndOfTunnel className="mt-1 flex-shrink-0 text-2xl" />
            ) : (
              <FcReadingEbook className="mt-1 flex-shrink-0 text-2xl" />
            )}
            <div className="w-full animate-pulse space-y-2">
              <div className="h-4 w-2/3 rounded-full bg-gray-200 shadow-sm" />
              <div className="h-4 w-5/6 rounded-full bg-gray-200 shadow-sm" />
              <div className="h-4 w-1/2 rounded-full bg-gray-200 shadow-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center border-t border-gray-100 bg-white p-4 pb-6 pl-2 pr-2 lg:pl-24 lg:pr-24">
        <div className="relative w-full">
          <div className="w-full rounded-full border border-gray-200 bg-gray-100 p-4 pr-12 text-black">
            {/* <div className="h-4 w-1/2 bg-gray-300 rounded-full animate-pulse" /> */}
          </div>
          <button
            disabled
            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300"
          >
            <svg
              className="h-6 w-6 animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          ⚡ Powered by{" "}
          <span className="font-semibold text-indigo-500">Kreatebots</span> ·
          100% Private & Secure
        </div>
      </div>
    </div>
  );
}
