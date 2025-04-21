import axios from "axios";

export const changePassword = async (_id: string, password: string) => {
  try {
    const response = await axios.put(`/api/users/${_id}/password`, {
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Нууц үг солих үед алдаа гарлаа:", error);
    throw error;
  }
};
