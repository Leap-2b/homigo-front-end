import { EmployeModel } from "@/app/models/employe-model";
import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../../utils/server/db";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectMongoDb();

    const { userId, employeId } = await req.json();

    if (!userId || !employeId) {
      return new NextResponse(
        JSON.stringify({ error: "userId болон EmployeId шаардлагатай" }),
        { status: 400 }
      );
    }

    // const employee = await EmployeModel.findByIdAndUpdate(
    //     userId,
    //     { $push: { products: newProduct._id } },
    //     { new: true }
    //   );

    const like = await EmployeModel.findByIdAndUpdate(
      employeId,
      { $push: { likedBy: userId } },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Амжилттай like дарлаа", like }),
      { status: 200 }
    );
  } catch (error) {
    console.error("LIKE API алдаа:", error);
    return new NextResponse(JSON.stringify({ error: "like алдаа гарлаа" }), {
      status: 500,
    });
  }
}
