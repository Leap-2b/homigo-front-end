import { categoryStatusEnum } from "../../utils/constants/enum";
import { ProductModelType } from "./product.type";

export type employeType = {
  _id: string;
  phone: number;
  secondPhone: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  register: string;
  about: string;
  address: string;
  experience: string;
  img: string;
  category: categoryStatusEnum;
  products: ProductModelType[];
  likedBy: string[];
};
