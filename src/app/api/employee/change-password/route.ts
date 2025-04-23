import { EmployeModel } from "@/app/models/employe-model";
import { NextResponse } from "next/server";
import { hashPassword } from "../../../../../utils/password-util";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, newPassword } = await req.json();

    const hashedPassword = await hashPassword(newPassword);
    const editedPassword = await EmployeModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Амжилттай солигдлоо", editedPassword }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "нууц үг солиход алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
