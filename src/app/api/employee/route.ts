import { NextResponse } from "next/server";
import { runQuery } from "../../../util/queryService";

export async function GET(): Promise<NextResponse> {
  try {
    const query = `SELECT id, phone, email FROM employees`;
    const employees = await runQuery(query, []);

    return new NextResponse(
      JSON.stringify({
        success: true,
        employees,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to fetch employees",
      }),
      { status: 500 }
    );
  }
}