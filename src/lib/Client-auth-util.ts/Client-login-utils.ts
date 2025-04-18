import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const ClientsignIn = async (phone: number, password: string) => {
  axios
    .post("http://localhost:8080/auth/users/sign-in", { phone, password })
    .then((response) => {
      const data = response.data.user;
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Амжилттай Нэвтэрлээ");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};
