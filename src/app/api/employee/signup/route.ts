import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { phone, email, password } = body;
    console.log("Processing employee registration request:", {
      phone,
      email,
      password: "REDACTED",
    });

    if (!phone || !email || !password) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing required fields",
          message: "Phone, email, and password are required",
        }),
        { status: 400 }
      );
    }

    const checkPhone = `SELECT * FROM employees WHERE phone = $1`;
    const phoneExists = await runQuery(checkPhone, [phone]);
    if (phoneExists && phoneExists.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Phone already exists",
          message: "This phone number is already registered",
        }),
        { status: 409 }
      );
    }

    const checkEmail = `SELECT * FROM employees WHERE email = $1`;
    const emailExists = await runQuery(checkEmail, [email]);
    if (emailExists && emailExists.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Email already exists",
          message: "This email is already registered",
        }),
        { status: 409 }
      );
    }

    const createEmployee = `INSERT INTO employees (phone, email, password) VALUES ($1, $2, $3) RETURNING id, phone, email`;
    const result = await runQuery(createEmployee, [phone, email, password]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Employee account created successfully",
        employee: result[0],
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create employee:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to create employee account",
      }),
      { status: 500 }
    );
  }
}