import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
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
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 