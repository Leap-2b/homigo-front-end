import axios from "axios";

export const otherInfo = async (
  _id: string,
  register: string,
  phone: string,
  address: string,
  experience: string,
  secondPhone: string
) => {
  try {
    const response = await axios.put(`api/users/${_id}`, {
      _id,
      register,
      phone,
      address,
      experience,
      secondPhone,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Бусад мэдээлэл солих үед алдаа гарлаа");
  }
};
