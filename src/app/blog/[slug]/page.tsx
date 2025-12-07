import { groq } from "next-sanity";

import { Post } from "@/components/post";
import { client } from "@/lib/sanity/client";
import { type PostWithAuthor } from "@/lib/sanity/types";

async function getPost({ slug }: { slug: string }) {
  const post: PostWithAuthor = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      ...,
      author->
    }`,
    {
      slug,
    },
  );

  return {
    post,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const getPostBySlug = await getPost({ slug });

  return <Post postWithAuthor={getPostBySlug.post} />;
}
