import Link from "next/link";

import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type Child = {
  _key: string;
  _type: string;
  text: string;
  style: string;
};

type Block = {
  _key: string;
  _type: string;
  children: Child[];
};

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  body: Block[];
  mainImage: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
  categories: {
    title: string;
  }[];
  author: {
    _ref: string;
  };
};

type Author = {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
};

const urlFor = (source: string | undefined) => {
  if (!source) return undefined;

  return imageUrlBuilder(client).image(source);
};

const getAuthor = async (authorId: string | undefined) => {
  const author = await client.fetch<Author>(`*[_id == $authorId][0]`, {
    authorId,
  });

  return author;
};

export async function HighlightBlock() {
  const posts = await client.fetch<Post[]>(`*[ _type == "post"]`);

  const mainFeatureAuthor = await getAuthor(posts[0]?.author._ref);
  return (
    <div className="grid w-full grid-cols-2">
      <div className="group relative col-span-1">
        <Link
          href={`/blog/${posts[0]?.slug?.current}`}
          className="relative flex min-h-[462px] w-full items-end overflow-hidden rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${urlFor(posts[0]?.mainImage.asset._ref)?.url()})`,
          }}
        >
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-8"></div>

          <div className="absolute bottom-0 left-0 flex h-2/5 w-full items-center bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8">
              <h2 className="text-3xl font-black text-white">
                {posts[0]?.title}
              </h2>

              <div
                style={{
                  backgroundImage: `url(${urlFor(mainFeatureAuthor?.image.asset._ref)?.url()})`,
                }}
                className="h-36 w-4 rounded-full bg-cover bg-center"
              ></div>
              <div className="text-white">{mainFeatureAuthor?.name}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
