import type { Author } from "@/lib/sanity/types";
import { getAuthor, urlFor } from "@/lib/sanity/utils";

interface AuthorBlockProps {
  authorId: string;
}

export const AuthorBlock: React.FC<AuthorBlockProps> = async ({ authorId }) => {
  const author: Author = await getAuthor(authorId);

  console.log(author.bio);
  return (
    <div className="flex flex-col gap-4 rounded-md px-8">
      <h2 className="text-2xl font-bold">Meet the author</h2>

      <div
        className="h-52 min-h-52 w-full rounded bg-cover bg-[center_60%]"
        style={{
          backgroundImage: `url(${urlFor(author?.image.asset._ref)?.url()})`,
        }}
      ></div>

      <h3 className="text-xl font-bold">{author.name}</h3>
      {author.bio.map((block) =>
        block.children.map((child) => (
          <p key={block._key} className="text-sm opacity-70">
            {child.text}
          </p>
        )),
      )}
    </div>
  );
};