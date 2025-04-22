import { UserModelType } from "@/types/user.type";
import { Model, Schema, model, models } from "mongoose";
import { userRoleStatusEnum } from "../../../utils/constants/enum";

const UserSchema = new Schema<UserModelType>(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    phone: { type: Number, required: true, unique: true },

    role: {
      type: String,
      enum: Object.values(userRoleStatusEnum),
      default: userRoleStatusEnum.USER,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel: Model<UserModelType> =
  models["Users"] || model<UserModelType>("Users", UserSchema);
