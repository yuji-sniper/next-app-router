import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    id: string
  }>
}

type Blog = {
  id: number;
  title: string;
  content: string;
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  return {
    title: `ブログ記事 ${id}`,
    description: `ブログ記事 ${id}の詳細ページです`,
  }
}

export default async function Page({ params }: Params) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/blog/${id}`)

  if (!res.ok) {
    notFound();
  }

  const blog: Blog = await res.json();

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  )
}
