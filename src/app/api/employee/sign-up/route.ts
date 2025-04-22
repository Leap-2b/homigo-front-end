import { NextResponse } from "next/server";
import { isExistingEmploye } from "../../../../../utils/existing-user-check";
import { EmployeModel } from "@/app/models/employe-model";
import { hashPassword } from "../../../../../utils/password-util";

export async function POST(req: Request): Promise<Response> {
  try {
    const {
      phone,
      email,
      password,
      firstName,
      lastName,
      register,
      about,
      address,
      secondPhone,
      experience,
      category,
      img,
    } = await req.json();

    const existingEmploye = await isExistingEmploye(email);
    if (existingEmploye) {
      return NextResponse.json(
        { error: "Емайл бүртгэлтэй байна" },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newEmploye = await EmployeModel.create({
      phone,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      register,
      about,
      address,
      secondPhone,
      experience,
      category,
      img,
    });
    return new NextResponse(
      JSON.stringify({ message: "Амжилттай бүртгэгдлээ", newEmploye })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "бүртгүүлхэд алдаа гарлаа" }),
      { status: 500 }
    );
  }
}
