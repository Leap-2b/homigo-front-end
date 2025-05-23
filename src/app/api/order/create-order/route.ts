import { OrderModel } from "@/app/models/order-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";
import "@/app/models/product-model";
import { sendEmail } from "../../../../../utils/send-email";
export async function POST(req: Request) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { email, request, userId, productId, employeId, totalPrice } = body;

    if (!request || !userId || !productId || !employeId || !totalPrice) {
      return new NextResponse(
        JSON.stringify({ error: "Мэдээлэл дутуу байна" }),
        {
          status: 400,
        }
      );
    }

    const newOrder = await OrderModel.create({
      request,
      userId,
      productId,
      employeId,
      totalPrice,
    });

    const populatedOrder = await OrderModel.findById(newOrder._id).populate(
      "productId"
    );
    await sendEmail({
      email,
      content: `<h1>Таньд захиалга ирлээ</h1><p>${request}</p>`,
      tittle: "Таньд захиалга ирлээ",
    });
    return new NextResponse(
      JSON.stringify({
        message: "Захиалга амжилттай үүслээ",
        order: populatedOrder,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Захиалга үүсгэхэд алдаа:", error);
    return new NextResponse(
      JSON.stringify({ error: "Захиалга үүсгэхэд алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
