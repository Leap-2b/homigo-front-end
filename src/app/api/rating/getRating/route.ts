import { RatingModel } from "@/app/models/rating-model";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  try {
    const rating = await RatingModel.find();

    return new NextResponse(
      JSON.stringify({ message: "succussfully get", rating }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "failed to create rating" }),
      { status: 500 }
    );
  }
}
