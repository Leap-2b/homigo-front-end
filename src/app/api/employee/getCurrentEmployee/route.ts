import { EmployeModel } from "@/app/models/employe-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";
import "@/app/models/product-model";
export async function POST(req: Request): Promise<Response> {
  await connectMongoDb();
  const { id } = await req.json();
  try {
    const EmployWithProducts = await EmployeModel.findById(id).populate(
      "products"
    );
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай", EmployWithProducts }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "алдаа гарлаа" }), {
      status: 500,
    });
  }
}
