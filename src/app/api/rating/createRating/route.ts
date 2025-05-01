import { RatingModel } from "@/app/models/rating-model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { rating, employeId, comments } = await req.json();
    const newRating = await RatingModel.create({
      rating,
      comments,
      employeId,
    });

    if (!newRating) {
      return new NextResponse(JSON.stringify({ error: "error" }));
    }
    return new NextResponse(
      JSON.stringify({ message: "succussfully created", newRating }),
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
