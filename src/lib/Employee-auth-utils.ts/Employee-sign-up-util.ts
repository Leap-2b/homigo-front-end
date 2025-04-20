import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const EmployeeSignUp = async (
  phone: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  register: string,
  about: string,
  address: string,
  secondPhone: number,
  experience: string,
  category: string,
  img: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/employe/sign-up",
      {
        phone,
        email,
        password,
        firstName,
        lastName,
        register,
        about,
        address,
        secondPhone,
        experience,
        category,
        img,
      }
    );
    const data = response.data;
    localStorage.setItem("employe", JSON.stringify(data));
    toast.success("Амжилттай Нэвтэрлээ");
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { message?: string };
      toast.error(data.message);
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("aldaa garlaa");
  }
};
