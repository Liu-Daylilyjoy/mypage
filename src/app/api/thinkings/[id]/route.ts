import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/serverAuth";

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.redirect("/login");
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, detail } = body;
    if (!title || !detail) {
      return Response.json({ error: "Title and detail are required" }, { status: 400 });
    }
    const thinking = await prismadb.thinking.update({
      where: { id },
      data: { title, detail }
    });
    return Response.json(thinking);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.redirect("/login");
  }
  try {
    const { id } = await params;
    await prismadb.thinking.delete({ where: { id } });
    return Response.json({ message: "Thinking deleted successfully" });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 