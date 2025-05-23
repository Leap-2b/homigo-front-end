import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const ClientSignUp = async (
  userName: string,
  email: string,
  phone: number,
  password: string
) => {
  try {
    const response = await axios.post(
      "/api/user/sign-up",
      {
        userName,
        email,
        phone,
        password,
      }
    );
    const data = response.data;
    localStorage.setItem("user", JSON.stringify(data));
    toast.success("Амжилттай нэвтэрлээ!");
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { message?: string };
      toast.error(data.message || "Нууц үг эсвэл утасны дугаар буруу.");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("aldaa garlaa");
  }
};
