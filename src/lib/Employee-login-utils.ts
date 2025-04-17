import axios from "axios";
import { toast } from "sonner";

export const signIn = async (phone: number, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/employe/sign-in`,
      { phone, password }
    );

    const data = response.data;
    toast.success("Амжилттай нэвтэрлээ!");

    return data;
  } catch (error: any) {
    if (error.response) {
      const data = error.response.data;
      toast.error(data.message || "Нууц үг эсвэл утасны дугаар буруу.");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", error);
    return null;
  }
};
