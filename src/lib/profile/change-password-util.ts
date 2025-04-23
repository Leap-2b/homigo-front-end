import axios from "axios";

export const changePassword = async (_id: string, password: string) => {
  try {
    const response = await axios.put(`/api/employee/change-password`, {
      id: _id,
      newPassword: password,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Нууц үг солих үед алдаа гарлаа:", error);
    throw error;
  }
};
