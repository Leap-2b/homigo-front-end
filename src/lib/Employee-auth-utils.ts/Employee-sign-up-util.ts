import axios from "axios";
import { toast } from "sonner";

export const EmployeeSignUp = async (
  phone: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  register: string,
  address: string,
  secondPhone: number,
  experience: string,
  category: string
) => {
  axios
    .post("http://localhost:8080/auth/employe/sign-up", {
      phone,
      email,
      password,
      firstName,
      lastName,
      register,
      address,
      secondPhone,
      experience,
      category,
    })
    .then((response) => {
      console.log(response), toast.success("Амжилттай Бүртгэгдлээ");
    })
    .catch((error) => {
      console.log(error), toast.error(error.data.message);
    });
};
