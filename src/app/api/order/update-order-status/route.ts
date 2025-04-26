import { NextResponse } from "next/server";
import { OrderModel } from "@/app/models/order-model";
import { connectMongoDb } from "../../../../../utils/server/db";
import { sendEmail } from "../../../../../utils/send-email";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, status } = await req.json();

    const validStatuses = ["APPROVE", "CANCEL", "CHANGE", "DONE"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Төлөв хүчингүй байна" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const updatedOrder: any = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    ).populate("userId");

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Захиалга олдсонгүй" },
        { status: 404 }
      );
    }
    const email = updatedOrder.userId.email;
    await sendEmail({
      email,
      content: `<h1>Таны захиалгийн хариу ирлээ</h1><p>${status}</p>`,
      tittle: "Таны захиалгийн хариу ирлээ",
    });
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
