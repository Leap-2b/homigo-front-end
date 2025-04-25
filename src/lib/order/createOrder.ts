import axios from "axios";

export const createOrder = async (
  email: string,
  request: string,
  userId: string,
  productId: string[],
  employeId: string,
  totalPrice: number
) => {
  try {
    const response = await axios.post("/api/order/create-order", {
      email,
      request,
      userId,
      productId,
      employeId,
      totalPrice,
    });
    return response.data;
  } catch (error) {
    console.error("захиалга үүсгэхэд алдаа гарлаа", error);
    throw error;
  }
};
