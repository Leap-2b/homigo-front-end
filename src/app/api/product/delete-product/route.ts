import { EmployeModel } from "@/app/models/employe-model";
import { ProductModel } from "@/app/models/product-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";

export async function DELETE(req: Request): Promise<Response> {
  await connectMongoDb();
  try {
    const { userId, productId } = await req.json();

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new NextResponse(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    const updatedEmployee = await EmployeModel.findByIdAndUpdate(
      userId,
      { $pull: { products: productId } },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Үйлчилгээг амжилттай устгалаа",
        employee: updatedEmployee,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "алдаа гарлаа" }), {
      status: 500,
    });
  }
}
