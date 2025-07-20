import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const blogs = await prismadb.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(blogs);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const blog = await prismadb.blog.create({
      data: {
        title,
        description,
        content: content || ""
      }
    });

    return Response.json(blog);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}