import { HighlightBlock } from "@/components/highlight-block";
import { PostsBlock } from "@/components/posts-block";

export default async function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-center">
      <div className="container flex max-w-[1175px] flex-col items-center justify-center gap-12 py-16">
        <HighlightBlock />

        <div className="grid w-full grid-cols-3 gap-8">
          <section className="col-span-2">
            <PostsBlock />
          </section>
        </div>
      </div>
    </main>
  );
}
