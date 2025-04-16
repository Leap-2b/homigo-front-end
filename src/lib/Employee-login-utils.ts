import axios from "axios";
import { toast } from "sonner";

export const signIn = async (phone: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/signup`, {
      phone,
      password,
    });

    const data = response.data;
    console.log(data);
    if (data.error) {
      toast.error(data.message || "Алдаа гарлаа.");
    } else {
      toast.success("Бүртгэл амжилттай!");
      return data;
    }
  } catch (error) {
    console.error("Бүртгүүлэх үед алдаа гарлаа:", error);
    toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
  }
};
