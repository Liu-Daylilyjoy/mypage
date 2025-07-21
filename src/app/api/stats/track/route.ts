import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page } = body;

    if (!page) {
      return Response.json({ error: "Missing required field: page" }, { status: 400 });
    }

    // 简单计数：有则+1，无则新建
    await prismadb.pageVisitCount.upsert({
      where: { page },
      update: { count: { increment: 1 } },
      create: { page, count: 1 }
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 