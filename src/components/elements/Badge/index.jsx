export default function Badge({ date }) {
  return (
    <>
      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 me-2">
        <svg
          viewBox="0 0 6 6"
          aria-hidden="true"
          className="size-1.5 fill-green-500"
        >
          <circle r={3} cx={3} cy={3} />
        </svg>
        {date}
      </span>
    </>
  );
}
