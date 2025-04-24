import axios from "axios";

export const getOrders = async (employeeId: string) => {
  try {
    const response = await axios.post("/api/order/get-orders", { employeeId });

    return response.data.orders;
  } catch (error) {
    console.error("Захиалгыг татаж чадсангүй:", error);
    throw error;
  }
};
