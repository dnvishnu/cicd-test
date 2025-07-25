import DateNavigation from "../DateNavigation";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 min-h-[900px] pt-44 pb-16">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/daynightcricket/assets/images/daynightcricket-hero.png')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-white/10" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium text-indigo-400 uppercase tracking-widest">
          Stay ahead of the game
        </p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow">
          daynightcricket
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-200 font-medium drop-shadow">
          Your ultimate companion for all things cricket – live match updates,
          summaries, and exclusive insights.
        </p>
      </div>

      <DateNavigation />
    </section>
  );
}
