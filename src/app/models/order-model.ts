import { model, Model, models, Schema } from "mongoose";
import { orderStatusEnum } from "../../../utils/constants/enum";
import { OrderModelType } from "@/types/order.type";

const OrderSchema = new Schema<OrderModelType>({
  orderStatus: {
    type: String,
    enum: Object.values(orderStatusEnum),
    default: orderStatusEnum.PENDING,
  },
  request: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  employeId: { type: Schema.Types.ObjectId, ref: "Employe", required: true },
  productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  isPaid: { type: Boolean, required: true, default: false },
  totalPrice: { type: Number, required: true },
});

export const OrderModel: Model<OrderModelType> =
  models["Orders"] || model<OrderModelType>("Orders", OrderSchema);
