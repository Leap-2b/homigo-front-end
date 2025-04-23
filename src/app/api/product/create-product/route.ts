import { EmployeModel } from "@/app/models/employe-model";
import { ProductModel } from "@/app/models/product-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";

export async function POST(req: Request): Promise<Response> {
  await connectMongoDb();
  try {
    const { name, price, userId } = await req.json();

    const newProduct = await ProductModel.create({
      name,
      price,
    });
    if (!newProduct) {
      return new NextResponse(JSON.stringify({ error: "алдаа гарлаа" }), {
        status: 400,
      });
    }
    const employee = await EmployeModel.findByIdAndUpdate(
      userId,
      { $push: { products: newProduct._id } },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({ message: "амжилттай нэмлээ", employee })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "алдаа гарлаа" }), {
      status: 500,
    });
  }
}
