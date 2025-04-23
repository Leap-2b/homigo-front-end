import axios from "axios";
import { toast } from "sonner";

export const deleteService = async (userId: string, productId: string) => {
  try {
    const response = await axios.delete("/api/product/delete-product", {
      data: { userId, productId },
    });
    toast.success("Үйлчилгээ амжилттай устлаа!");
    return response.data;
  } catch (error) {
    console.error("Устгах үед алдаа гарлаа:", error);
    toast.error("Устгах үед алдаа гарлаа.");
    throw error;
  }
};
