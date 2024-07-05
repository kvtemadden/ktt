import { AuthorBlock } from "@/components/author-block";
import { HighlightBlock } from "@/components/highlight-block";
import { PostsBlock } from "@/components/posts-block";
import { SubscribeBlock } from "@/components/subscribe-block";

export default async function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-center">
      <div className="container flex max-w-[1175px] flex-col items-center justify-center gap-12 py-16">
        <HighlightBlock />

        <div className="grid w-full grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-8">
          <section className="col-span-2">
            <PostsBlock />
          </section>
          <aside className="col-span-1">
            <AuthorBlock authorId="2c9c4a0b-21aa-4379-9197-c1e65f71d914" />
          </aside>
        </div>

        <SubscribeBlock />
      </div>
    </main>
  );
}
