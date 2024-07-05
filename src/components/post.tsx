"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
} from "next-sanity";

import { urlFor } from "@/lib/sanity/utils";
import type { Image as ImageType, PostWithAuthor } from "@/lib/sanity/types";

import { AuthorBlock } from "./author-block";

const ptComponents = {
  types: {
    image: ({ value }: { value: ImageType }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value.asset._ref)?.url() ?? " "}
        />
      );
    },
  },
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-2xl">{children}</h1>
    ),
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="pt-2 text-xl font-bold">{children}</h4>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="py-4 leading-8 opacity-70">{children}</p>
    ),
  },
};

interface PostProps {
  postWithAuthor: PostWithAuthor;
}

export const Post: React.FC<PostProps> = ({ postWithAuthor }) => {
  const [post, setPost] = useState<PostWithAuthor | null>(postWithAuthor);

  useEffect(() => {
    if (post === null) setPost(postWithAuthor);
  }, [post, postWithAuthor]);

  if (!post) {
    return null;
  }

  return (
    <div className="grid grid-cols-6 gap-16">
      <Link
        href={`/blog/${post?.slug?.current}`}
        className="relative col-span-6 flex min-h-[462px] w-full items-end overflow-hidden rounded-lg"
      >
        <div
          className="relative flex min-h-[462px] w-full items-end overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: `url(${urlFor(post?.mainImage?.asset?._ref)?.url()})`,
          }}
        ></div>

        <div className="absolute bottom-0 left-0 flex h-3/5 w-full items-center bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8">
            <h2 className="text-3xl font-black text-white">{post?.title}</h2>

            <div className="flex flex-row flex-nowrap items-center gap-6">
              <div className="flex flex-row items-center gap-2 font-medium text-white">
                <div
                  className="h-8 min-h-8 w-8 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${urlFor(post.author?.image?.asset?._ref)?.url()})`,
                  }}
                ></div>
                <div className="font-medium text-white">
                  {post.author?.name}
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 font-medium text-white">
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
      </Link>

      <div className="col-span-6 grid gap-12 md:grid-cols-6 md:gap-16">
        <div className="order-2 col-span-6 md:order-1 md:col-span-2">
          {post.author._id && <AuthorBlock authorId={post.author._id} />}
        </div>

        <article className="order-1 col-span-6 md:col-span-4">
          <PortableText value={post.body} components={ptComponents} />
        </article>
      </div>
    </div>
  );
};
