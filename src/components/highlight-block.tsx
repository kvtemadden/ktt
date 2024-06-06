import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { Clock } from "lucide-react";

import { client } from "@/lib/sanity/client";

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
  _createdAt: string;
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
    _ref: string;
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

type Category = {
  _id: string;
  title: string;
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

const getCategory = async (categoryId: string | undefined) => {
  const category = await client.fetch<Category>(`*[_id == $categoryId][0]`, {
    categoryId,
  });

  return category;
};

export async function HighlightBlock() {
  const posts = await client.fetch<Post[]>(`*[ _type == "post"]`);

  const mainFeatureAuthor = await getAuthor(posts[0]?.author._ref);

  const mainFeatureCategory = await getCategory(posts[0]?.categories[0]?._ref);
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

      <div className="col-span-1"></div>
    </div>
  );
}

interface HighlightBlockArticleProps {
  post: Post;
}

export const HighlightBlockArticle = ({ post }: HighlightBlockArticleProps) => {
  return <div className="flex flex-col"></div>;
};
