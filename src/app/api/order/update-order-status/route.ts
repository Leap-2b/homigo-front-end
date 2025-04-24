import { NextResponse } from "next/server";
import { OrderModel } from "@/app/models/order-model";
import { connectMongoDb } from "../../../../../utils/server/db";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, status } = await req.json();

    const validStatuses = ["APPROVE", "CANCEL", "CHANGE"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Төлөв хүчингүй байна" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Захиалга олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Төлөв амжилттай шинэчлэгдлээ",
      updatedOrder,
    });
  } catch (error) {
    console.error("Төлөв шинэчлэх алдаа:", error);
    return NextResponse.json(
      { message: "Дотоод алдаа гарлаа" },
      { status: 500 }
    );
  }
}
