import { employeType } from "@/types/employe.type";
import { categoryStatusEnum } from "../../../utils/constants/enum";
import { Schema, Model, model, models } from "mongoose";

const EmployeSchema = new Schema<employeType>({
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  register: { type: String, required: true },
  about: { type: String, required: true },
  address: { type: String, required: true },
  secondPhone: { type: Number, required: true },
  experience: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(categoryStatusEnum),
    required: true,
  },
  img: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const EmployeModel: Model<employeType> =
  models["Employe"] || model<employeType>("Employe", EmployeSchema);
