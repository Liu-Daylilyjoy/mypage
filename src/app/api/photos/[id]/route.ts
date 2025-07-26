import prismadb from "@/lib/prismadb";
import { adminAuth } from "@/lib/serverAuth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const photo = await prismadb.photo.findUnique({ where: { id } });
    if (!photo) {
      return Response.json({ error: "Photo not found" }, { status: 404 });
    }
    return Response.json(photo);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, path } = body;
    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }
    const photo = await prismadb.photo.update({
      where: { id },
      data: { title, description, path: path || "" }
    });
    return Response.json(photo);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prismadb.photo.delete({ where: { id } });
    return Response.json({ message: "Photo deleted successfully" });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 