import { employeType } from "@/types/user";
import axios from "axios";

export const fetchAllEmployees = async (): Promise<
  employeType[] | undefined
> => {
  try {
    const { data } = await axios.get<employeType[]>(
      "http://localhost:8080/auth/employe"
    );

    if (data) return data;
    throw new Error("No data received");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return undefined;
  }
};
