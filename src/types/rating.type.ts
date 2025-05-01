import { ObjectId, Schema } from "mongoose";

export type RatingModelType = {
  _id: Schema.Types.ObjectId;
  rating: number;
  employeId: ObjectId;
  comments: string;
};
