import axios from "axios";

export const changeAdditionallinfo = async (
  id: string,
  register: string,
  phone: number,
  address: string,
  experience: string,
  secondPhone: number
) => {
  try {
    const response = await axios.put("/api/employee/change-additionall-Info", {
      id,
      register,
      phone,
      address,
      experience,
      secondPhone,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Бусад мэдээлэл солих үед алдаа гарлаа:", error);
    throw error;
  }
};
