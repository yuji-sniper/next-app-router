import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ブログ記事一覧",
  description: "ブログ記事一覧ページです",
}

type Blog = {
  id: number;
  title: string;
  content: string;
}

export default async function Page() {
  const blogs: Blog[] = await fetch("http://localhost:3000/api/blog").then((res) => res.json());

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}
