import { employeType } from "@/types/user";
import axios from "axios";

export const fetchAllEmployees = async (): Promise<
  employeType[] | undefined
> => {
  try {
    const { data } = await axios.get("/api/employee/getAllEmployee");
    console.log(data);
    if (data) return data.EmployWithProducts;
    throw new Error("No data received");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error);
    } else {
      console.log("Unknown error:", error);
    }
  }
};
