import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const photos = await prismadb.photo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(photos);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, path } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const photo = await prismadb.photo.create({
      data: {
        title,
        description,
        path: path || ""
      }
    });

    return Response.json(photo);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}