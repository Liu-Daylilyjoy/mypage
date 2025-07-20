import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    // 并行获取所有类型的数量
    const [blogsCount, thinkingsCount, photosCount] = await Promise.all([
      prismadb.blog.count(),
      prismadb.thinking.count(),
      prismadb.photo.count()
    ]);

    return Response.json({
      blogs: blogsCount,
      thinkings: thinkingsCount,
      photos: photosCount
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 