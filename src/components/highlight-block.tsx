import Link from "next/link";
import { Clock } from "lucide-react";

import { client } from "@/lib/sanity/client";
import type { Post } from "@/lib/sanity/types";
import { getAuthor, getCategory, urlFor } from "@/lib/sanity/utils";

export async function HighlightBlock() {
  const posts = await client.fetch<Post[]>(`*[ _type == "post"]`);

  const mainFeatureAuthor = await getAuthor(posts[0]?.author._ref);

  const mainFeatureCategory = await getCategory(posts[0]?.categories[0]?._ref);
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-5">
      <div className="group relative col-span-3">
        <Link
          href={`/blog/${posts[0]?.slug?.current}`}
          className="relative flex min-h-[462px] w-full items-end overflow-hidden rounded-lg"
        >
          <div
            className="relative flex min-h-[462px] w-full items-end overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{
              backgroundImage: `url(${urlFor(posts[0]?.mainImage.asset._ref)?.url()})`,
            }}
          ></div>

          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-8"></div>

          <div className="absolute bottom-0 left-0 flex h-3/5 w-full items-center bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8">
              <div className="rounded bg-white px-4 py-2">
                <div className="text-xs font-bold uppercase tracking-wider text-black/80">
                  {mainFeatureCategory?.title}
                </div>
              </div>

              <h2 className="text-3xl font-black text-white">
                {posts[0]?.title}
              </h2>

              <div className="flex flex-row flex-nowrap items-center gap-6">
                <div className="flex flex-row items-center gap-2 font-medium text-white">
                  <div
                    className="h-8 min-h-8 w-8 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${urlFor(mainFeatureAuthor?.image.asset._ref)?.url()})`,
                    }}
                  ></div>
                  <div className="font-medium text-white">
                    {mainFeatureAuthor?.name}
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 font-medium text-white">
                  <Clock size={25} />
                  {new Date(posts[0]?._createdAt ?? "").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-span-2 flex h-full flex-col justify-evenly">
        {posts.slice(1, 4).map((post) => (
          <div
            key={post._id}
            className="flex flex-col gap-4 border-b border-border py-8 last:border-b-0"
          >
            <HighlightBlockArticle post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface HighlightBlockArticleProps {
  post: Post;
}

export const HighlightBlockArticle = async ({
  post,
}: HighlightBlockArticleProps) => {
  const postCategory = await getCategory(post.categories[0]?._ref);

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="flex flex-col gap-4 transition-transform duration-300 hover:translate-x-1"
    >
      <div className="text-xs font-bold uppercase tracking-wider text-black/80">
        {postCategory?.title}
      </div>
      <h2 className="text-2xl font-black">{post.title}</h2>{" "}
    </Link>
  );
};
