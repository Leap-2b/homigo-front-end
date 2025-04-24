import { OrderModel } from "@/app/models/order-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";
import "@/app/models/product-model";
export async function POST(req: Request) {
  await connectMongoDb();

  try {
    const { employeeId } = await req.json();

    if (!employeeId) {
      return NextResponse.json(
        { error: "employeeId байхгүй байна" },
        { status: 400 }
      );
    }

    const orders = await OrderModel.find({ employeId: employeeId }).populate(
      "productId"
    );

    return NextResponse.json(
      {
        message: "Амжилттай get хүсэлт хийлээ",
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Алдаа:", error);
    return NextResponse.json(
      { error: "Захиалга татах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
