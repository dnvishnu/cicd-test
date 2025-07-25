import HomeMatches from "../HomeMatches";

export default function Banner({ home = false, matches }) {
  return (
    <div style={{ backgroundColor: "#007b5e" }}>
      <div className="flex items-center px-6 py-1 sm:px-3.5 sm:before:flex-1">
        <p className="flex items-center text-xs sm:text-sm text-white justify-center sm:justify-start">
          <a
            href="/"
            className="flex flex-col lg:flex-row items-center gap-x-2 justify-center sm:justify-start"
          >
            <strong className="font-semibold flex items-center gap-x-2">
              <img
                alt="Dataknobs"
                src="https://storage.googleapis.com/kreatewebsites-assets/daynightcricket/cricket-ball.webp"
                className="h-8 w-auto"
              />
              DayNightCricket
            </strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="size-0.5 fill-current hidden sm:inline"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <span className="hidden sm:inline">
              Stay updated with the latest scores, stats, and match
              analysis&nbsp;
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              &rarr;
            </span>
          </a>
        </p>
        <div className="flex flex-1 justify-end"></div>
      </div>
      {(home && matches) && <HomeMatches matches={matches}/>}
    </div>
  );
}
