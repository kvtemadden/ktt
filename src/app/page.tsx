import Link from "next/link";

import { HighlightBlock } from "@/components/highlight-block";

export default async function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-center">
      <div className="container flex max-w-[1175px] flex-col items-center justify-center gap-12 py-16">
        <HighlightBlock />
      </div>
    </main>
  );
}
