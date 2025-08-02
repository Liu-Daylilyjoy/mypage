import fs from "fs/promises";
import path from "path";
import prismadb from "@/lib/prismadb";
import { adminAuth } from "@/lib/serverAuth";
import { NextResponse } from "next/server";

const postsDir = path.join(process.cwd(), "src", "posts");

export async function POST(req: Request, { params }: { params: Promise<{ imgPath: string, id: string }> }) {
  if (!await adminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, imgPath: cover } = await params;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const ext = path.extname(fileName);
    const newImgPath = `${id}${ext}`;

    const fullPath = path.join(postsDir, "photography", newImgPath);

    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(fullPath, Buffer.from(arrayBuffer));

    // 更新数据库中的path字段
    if (cover && cover !== newImgPath) {
      await prismadb.photo.update({
        where: { id },
        data: { path: newImgPath }
      });

      // 删除旧图片
      const oldPath = path.join(postsDir, "photography", cover);
      try {
        await fs.access(oldPath);
        await fs.unlink(oldPath);
      } catch {
        // 文件不存在，忽略错误
      }
    } else {
      // 如果没有旧路径，直接更新
      await prismadb.photo.update({
        where: { id },
        data: { path: newImgPath }
      });
    }

    return Response.json({ success: true, status: 200, newImgPath });
  } catch (error) {
    return Response.json({ error: `Failed to upload img: ${error}` }, { status: 500 });
  }
} 