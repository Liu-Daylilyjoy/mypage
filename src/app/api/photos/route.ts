import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const photos = await prismadb.photo.findMany();

    return Response.json(photos);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}