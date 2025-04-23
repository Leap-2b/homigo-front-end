import { ProductModelType } from "@/types/product.type";
import { Schema, model, models, Model } from "mongoose";

const ProductSchema = new Schema<ProductModelType>({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
});

export const ProductModel: Model<ProductModelType> =
  models["Product"] || model<ProductModelType>("Product", ProductSchema);
