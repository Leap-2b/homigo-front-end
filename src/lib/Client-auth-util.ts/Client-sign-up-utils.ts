import axios from "axios";
import { toast } from "sonner";

export const ClientSignUp = async (
  userName: string,
  email: string,
  phone: number,
  password: string
) => {
  axios
    .post("http://localhost:8080/auth/users/sign-up", {
      userName,
      email,
      phone,
      password,
    })
    .then((response) => {
      console.log(response);
      toast.success("Амжилттай бүртгэгдлээ");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};
