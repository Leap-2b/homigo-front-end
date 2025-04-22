import { EmployeModel } from "@/app/models/employe-model";
import { UserModel } from "@/app/models/user-model";

export const isExistingEmailUser = async (email: string) => {
  return await UserModel.findOne({ email });
};
export const isExistingPhoneUser = async (phone: string) => {
  return await UserModel.findOne({ phone });
};
export const isExistingEmploye = async (email: string) => {
  return await EmployeModel.findOne({ email });
};
