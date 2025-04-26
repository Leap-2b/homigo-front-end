import axios from "axios";

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const response = await axios.put("/api/order/update-order-status", {
      id,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("захиалга мэдээлэл солих үед алдаа гарлаа:", error);
    throw error;
  }
};
