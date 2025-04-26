import axios from "axios";

export const personalInfo = async (
  _id: string,
  img: string,
  firstName: string,
  lastName: string,
  about: string,
  email: string
) => {
  try {
    const response = await axios.put(`/api/users/${_id}/profile`, {
      _id,
      img,
      firstName,
      lastName,
      about,
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error, "Хувийн мэдээлэл солих үед алдаа гарлаа");
    throw new Error("Хувийн мэдэээлэл солих үед алдаа гарлаа");
  }
};
