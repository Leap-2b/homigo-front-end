import { EmployeModel } from "@/app/models/employe-model";
import { NextResponse } from "next/server";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, register, phone, address, experience, secondPhone } =
      await req.json();
    const changedInfo = await EmployeModel.findByIdAndUpdate(
      id,
      { register, phone, address, experience, secondPhone },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай солигдлоо", changedInfo })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "нууц үг солиход алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
