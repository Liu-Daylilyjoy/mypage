import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const photo = await prismadb.photo.findUnique({
      where: { id }
    });

    if (!photo) {
      return Response.json({ error: "Photo not found" }, { status: 404 });
    }

    return Response.json(photo);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, path } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const photo = await prismadb.photo.update({
      where: { id },
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    await prismadb.photo.delete({
      where: { id }
    });

    return Response.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 