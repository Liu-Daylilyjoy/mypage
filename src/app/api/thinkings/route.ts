import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const thinkings = await prismadb.thinking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(thinkings);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, detail, cover } = body;

    if (!title || !detail) {
      return Response.json({ error: "Title and detail are required" }, { status: 400 });
    }

    const thinking = await prismadb.thinking.create({
      data: {
        title,
        detail,
        cover: cover || ""
      }
    });

    return Response.json(thinking);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}