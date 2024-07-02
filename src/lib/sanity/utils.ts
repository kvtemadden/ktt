import imageUrlBuilder from "@sanity/image-url";

import { client } from "./client";
import type { Author, Category, Post } from "./types";
import { groq } from "next-sanity";

export const urlFor = (source: string | undefined) => {
  if (!source) return undefined;

  return imageUrlBuilder(client).image(source);
};

export const getAuthor = async (authorId: string | undefined) => {
  const author = await client.fetch<Author>(`*[_id == $authorId][0]`, {
    authorId,
  });

  return author;
};

export const getCategory = async (categoryId: string | undefined) => {
  const category = await client.fetch<Category>(`*[_id == $categoryId][0]`, {
    categoryId,
  });

  return category;
};

export const getPostBySlug = async (slug: string) => {
  const post = await client.fetch<Post>(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    },
  );

  return post;
};
