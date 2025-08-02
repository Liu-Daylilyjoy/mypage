import prismadb from "@/lib/prismadb";
import { adminAuth } from "@/lib/serverAuth";

export async function GET() {
  try {
    const photos = await prismadb.photo.findMany({
      orderBy: {
        shotTime: "desc"
      }
    });

    return Response.json(photos);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, description, shotTime, shotPlace } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const photo = await prismadb.photo.create({
      data: {
        title,
        description,
        shotTime,
        shotPlace
      }
    });

    return Response.json(photo);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}