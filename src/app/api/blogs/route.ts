import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const blogs = await prismadb.blog.findMany();

    return Response.json(blogs);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}