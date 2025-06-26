import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const thinkings = await prismadb.thinking.findMany();

    return Response.json(thinkings);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}