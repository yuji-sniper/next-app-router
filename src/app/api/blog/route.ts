import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json([
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
  ]);
}
