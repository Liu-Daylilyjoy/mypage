import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/serverAuth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blog = await prismadb.blog.findUnique({ where: { id } });
    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }
    return Response.json(blog);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.redirect("/login");
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return Response.json({ error: "Title and description are required" }, { status: 400 });
    }

    const blog = await prismadb.blog.update({
      where: { id },
      data: {
        title,
        description,
        updatedAt: new Date()
      }
    });

    return Response.json(blog);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prismadb.blog.delete({ where: { id } });
    return Response.json({ message: "Blog deleted successfully" });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}