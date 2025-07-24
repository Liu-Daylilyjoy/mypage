import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const [blogsCount, thinkingsCount, photosCount, visitStats] = await Promise.all([
      prismadb.blog.count(),
      prismadb.thinking.count(),
      prismadb.photo.count(),
      prismadb.pageVisitCount.findMany({})
    ]);

    return Response.json({
      blogs: blogsCount,
      thinkings: thinkingsCount,
      photos: photosCount,
      visitStats: visitStats.map((stat: { page: string; count: number }) => ({
        page: stat.page,
        count: stat.count
      }))
    });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 