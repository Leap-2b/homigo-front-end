import axios from "axios";

export const likeEmploye = async (userId: string, employeId: string) => {
  try {
    const response = await axios.post("/api/employee/like-employee", {
      userId,
      employeId,
    });
    return response.data;
  } catch (error) {
    console.error("Like дархад алдаа:", error);
    throw new Error("Like дархад алдаа гарлаа");
  }
};
