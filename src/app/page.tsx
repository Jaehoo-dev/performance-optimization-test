import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 items-center">
        <Link href="/list" className="underline">
          List
        </Link>
        <Link href="/frequent-state-changes" className="underline">
          Frequent State Changes
        </Link>
        <Link href="/computation-heavy" className="underline">
          Computation Heavy
        </Link>
        <Link href="/prop-drilling" className="underline">
          Prop Drilling
        </Link>
        <Link href="/inline-event-handlers" className="underline">
          Inline Event Handlers
        </Link>
        <Link href="/ssr" className="underline">
          SSR
        </Link>
        <Link href="/lazy-loading" className="underline">
          Lazy Loading
        </Link>
      </div>
    </div>
  );
}
