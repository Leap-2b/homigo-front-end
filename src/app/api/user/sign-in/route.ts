import { UserModel } from "@/app/models/user-model";
import { NextResponse } from "next/server";
import { comparePassword } from "../../../../../utils/password-util";
import { connectMongoDb } from "../../../../../utils/server/db";

connectMongoDb();

export async function POST(req: Request): Promise<Response> {
  try {
    const { phone, password } = await req.json();

    const user = await UserModel.findOne({ phone }).select("+password");

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: `${phone} дугаартай хэрэглэгч байхгүй байна` }),
        { status: 404 }
      );
    }

    const isPasswordCorrect = comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({ error: `Нууц үг буруу байна` }),
        { status: 401 }
      );
    }

    // Нууц үг зөв бол
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай нэвтэрлээ", user }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Нэвтрэхэд алдаа гарлаа" }),
      { status: 500 } // ← системийн алдаа
    );
  }
}
