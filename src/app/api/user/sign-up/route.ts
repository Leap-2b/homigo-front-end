import { NextResponse } from "next/server";
import {
  isExistingEmailUser,
  isExistingPhoneUser,
} from "../../../../../utils/existing-user-check";
import { hashPassword } from "../../../../../utils/password-util";
import { UserModel } from "@/app/models/user-model";

export async function POST(req: Request): Promise<Response> {
  try {
    const { userName, email, phone, password } = await req.json();
    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: `Емайл ээ оруулна уу` }),
        { status: 400 }
      );
    }
    const existingEmailUser = await isExistingEmailUser(email);
    const existingNunberUser = await isExistingPhoneUser(phone);

    if (existingEmailUser) {
      return new NextResponse(
        JSON.stringify({
          error: `${email} дээр хэрэглэгч аль хэдийн бүртгүүлсэн байна`,
        }),
        { status: 409 }
      );
    }
    if (existingNunberUser) {
      return new NextResponse(
        JSON.stringify({
          error: `${phone} дээр хэрэглэгч аль хэдийн бүртгүүлсэн байна`,
        }),
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      userName,
      email,
      phone,
      password: hashedPassword,
    });
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай бүртгүүллээ", newUser })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "бүртгүүлхэд алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
