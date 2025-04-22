import { Schema } from "mongoose";

export type ProductModelType = {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  description: string;
};
