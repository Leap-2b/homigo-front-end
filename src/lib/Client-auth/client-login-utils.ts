import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const ClientsignIn = async (phone: number, password: string) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      phone,
      password,
    });
    console.log("API response:", response.data); //
    const data = response.data;

    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error?: string }>;

    if (axiosError.response) {
      const errorMessage = axiosError.response.data?.error || "Алдаа гарлаа";
      toast.error(errorMessage);
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    throw new Error("Алдаа гарлаа");
  }
};
