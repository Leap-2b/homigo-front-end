import axios from "axios";

export const EmployeeGetOrder = async (employeeId: string) => {
  try {
    const response = await axios.post("/api/order/employee-get-orders", {
      employeeId,
    });

    return response.data.orders;
  } catch (error) {
    console.error("Захиалгыг татаж чадсангүй:", error);
    throw error;
  }
};
