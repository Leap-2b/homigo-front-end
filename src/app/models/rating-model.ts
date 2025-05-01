import { RatingModelType } from "@/types/rating.type";
import { Schema, model, models, Model } from "mongoose";

const ratingSchema = new Schema<RatingModelType>({
  rating: { type: Number, required: true },
  comments: { type: String },
  employeId: { type: Schema.Types.ObjectId, ref: "Employe", required: true },
});

export const RatingModel: Model<RatingModelType> =
  models.Rating || model<RatingModelType>("Rating", ratingSchema);
