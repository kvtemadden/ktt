import Link from "next/link";
import { Clock } from "lucide-react";

import { client } from "@/lib/sanity/client";
import type { Post } from "@/lib/sanity/types";
import { getAuthor, getCategory, urlFor } from "@/lib/sanity/utils";

export const PostsBlock = async () => {
  const getPosts = await client.fetch<Post[]>(`*[ _type == "post"]`);

  const posts = getPosts.slice(4);
  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-2xl font-black text-black">Latest Posts</h2>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = async ({ post }) => {
  const author = await getAuthor(post?.author._ref);

  const category = await getCategory(post?.categories[0]?._ref);
  return (
    <div className="grid w-full grid-cols-2">
      <Link
        key={post._id}
        href={`/blog/${post?.slug?.current}`}
        className="group relative min-h-[325px] w-full items-end overflow-hidden rounded-lg"
      >
        <div
          className="relative flex min-h-[325px] w-full items-end overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: `url(${urlFor(post?.mainImage.asset._ref)?.url()})`,
          }}
        ></div>
      </Link>

      <div className="col-span-1 flex w-full items-center">
        <div className="flex h-full w-full flex-col items-start justify-center gap-4 p-8">
          <div className="text-xs font-bold uppercase tracking-wider text-black/80">
            {category?.title}
          </div>

          <Link href={`/blog/${post?.slug?.current}`}>
            <h2 className="text-2xl font-black text-black">{post?.title}</h2>
          </Link>

          <div className="flex flex-col flex-wrap items-start gap-6 md:flex-row">
            <div className="flex flex-row items-center gap-2 font-medium text-black">
              <div
                className="h-6 min-h-6 w-6 rounded-full bg-cover bg-center md:h-8 md:min-h-8 md:w-8"
                style={{
                  backgroundImage: `url(${urlFor(author?.image.asset._ref)?.url()})`,
                }}
              ></div>
              <div className="font-medium text-black">{author?.name}</div>
            </div>

            <div className="flex flex-row items-center gap-2 font-medium text-black">
              <Clock size={25} />
              {new Date(post?._createdAt ?? "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
