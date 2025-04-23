import axios from "axios";
import { toast } from "sonner";

export const addService = async (
  userId: string,
  name: string,
  price: number
) => {
  try {
    const response = await axios.post("/api/product/create-product", {
      userId,
      name,
      price,
    });
    toast.success("Амжилттай нэмэгдлээ!");
    console.log(response);
  } catch (error: unknown) {
    console.error("Үйлчилгээ нэмхэд алдаа гарлаа", error);
    throw error;
  }
};
