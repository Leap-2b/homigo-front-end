import axios from "axios";

export const createOrder = async (
  request: string,
  userId: string,
  productId: string[],
  employeId: string,
  totalPrice: number
) => {
  try {
    const response = await axios.post("/api/order/create-order", {
      request,
      userId,
      productId,
      employeId,
      totalPrice,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("захиалга үүсгэхэд алдаа гарлаа", error);
    throw error;
  }
};
