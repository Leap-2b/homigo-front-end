import { EmployeModel } from "@/app/models/employe-model";
import { NextResponse } from "next/server";
import { comparePassword } from "../../../../../utils/password-util";

export async function POST(req: Request): Promise<Response> {
  try {
    const { phone, password } = await req.json();
    const employe = await EmployeModel.findOne({ phone });
    if (!employe) {
      return new NextResponse(
        JSON.stringify({ error: "тухайн утсандээр ажилтан бүртгэлгүй байна" }),
        { status: 400 }
      );
    }
    const isPasswordCorrect = comparePassword(password, employe.password);
    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({ error: "Нууц үг буруу байна" }),
        { status: 401 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай нэвтэрлээ", employe })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "бүртгүүлхэд алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
