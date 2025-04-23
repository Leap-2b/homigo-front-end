import { EmployeModel } from "@/app/models/employe-model";
import { ProductModel } from "@/app/models/product-model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, price, description, userId } = await req.json();

    const newProduct = await ProductModel.create({
      name,
      price,
      description,
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
