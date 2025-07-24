import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/AuthConfig";

export async function GET() {
  try {
    const blogs = await prismadb.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(blogs);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const blog = await prismadb.blog.create({
      data: {
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return Response.json(blog);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}