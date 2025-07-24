import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/AuthConfig";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const thinking = await prismadb.thinking.findUnique({ where: { id } });
    if (!thinking) {
      return Response.json({ error: "Thinking not found" }, { status: 404 });
    }
    return Response.json(thinking);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, detail, cover } = body;
    if (!title || !detail) {
      return Response.json({ error: "Title and detail are required" }, { status: 400 });
    }
    const thinking = await prismadb.thinking.update({
      where: { id },
      data: { title, detail, cover: cover || "" }
    });
    return Response.json(thinking);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prismadb.thinking.delete({ where: { id } });
    return Response.json({ message: "Thinking deleted successfully" });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 