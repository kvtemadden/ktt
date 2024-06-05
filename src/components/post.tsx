// import Link from "next/link";

// import { client } from "@/lib/sanity/client";

// type Child = {
//   _key: string;
//   _type: string;
//   text: string;
//   style: string;
// };

// type Block = {
//   _key: string;
//   _type: string;
//   children: Child[];
// };

// type Post = {
//   _id: string;
//   title?: string;
//   slug?: {
//     current: string;
//   };
//   body: Block[];
// };

// export async function HighlightBlock() {
//   const posts = await client.fetch<Post[]>(`*[ _type == "post"]`);
//   return (
//     <div className="grid grid-cols-2 bg-red-500">
//       <div>
//         {posts.map((post: Post) => (
//           <div key={post._id}>
//             <Link href={`/blog/${post.slug?.current}`}>
//               <a>{post.title}</a>
//               <div>
//                 {post.body.map((block) => (
//                   <div key={block._key}>
//                     {block.children.map((child) => (
//                       <span
//                         key={child._key}
//                         style={{
//                           fontWeight:
//                             child.style === "bold" ? "bold" : "normal",
//                         }}
//                       >
//                         {child.text}
//                       </span>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//       {/* picture col */}
//       {/* <div className="col-span-1">
//         <Link
//           href={`/blog/${article.fields.slug}`}
//           className="relative flex min-h-[562px] items-end overflow-hidden rounded-lg"
//           style={{ backgroundImage: `url(${article.image})` }}
//         ></Link>
//       </div> */}
//     </div>
//   );
// }
