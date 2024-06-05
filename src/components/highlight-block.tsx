import Link from "next/link";

type Article = {
  title: string;
  description: string;
  image: string;
  slug: string;
  article: string;
  category: string;
  date: string;
  author: string;
};

interface HighlightBlockProps {
  article: Article;
}

export const HighlightBlock: React.FC<HighlightBlockProps> = ({ article }) => {
  return (
    <div className="grid grid-cols-2">
      {/* picture col */}
      <div className="col-span-1">
        <Link
          href={article.slug}
          className="relative flex min-h-[562px] items-end overflow-hidden rounded-lg"
          style={{ backgroundImage: `url(${article.image})` }}
        ></Link>
      </div>
    </div>
  );
};
