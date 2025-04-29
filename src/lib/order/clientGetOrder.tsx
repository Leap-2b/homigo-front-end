import axios from "axios";

export const ClientGetOrder = async (userId: string) => {
  try {
    const response = await axios.post("/api/order/client-get-order", {
      userId,
    });

    console.log(response);

    return response.data.orders;
  } catch (error) {
    console.error("Захиалгыг татаж чадсангүй:", error);
    throw error;
  }
};
