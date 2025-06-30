import { NextResponse } from "next/server";

const blogs = [
  {
    id: 1,
    title: "Blog 1",
    content: "Blog 1 content"
  },
  {
    id: 2,
    title: "Blog 2",
    content: "Blog 2 content"
  },
  {
    id: 3,
    title: "Blog 3",
    content: "Blog 3 content"
  }
]

type Context = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: Request, context: Context) {
  const { id } = await context.params;

  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}
