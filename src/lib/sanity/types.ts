export type Child = {
  _key: string;
  _type: string;
  text: string;
  style: string;
};

export type Block = {
  _key: string;
  _type: string;
  children: Child[];
};

export type Post = {
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

export type Author = {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  bio: Block[];
};

export type Category = {
  _id: string;
  title: string;
};
