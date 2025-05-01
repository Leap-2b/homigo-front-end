import axios from "axios";

export const getRating = async () => {
  try {
    const data = await axios.get("/api/rating/getRating");

    if (data) return data;
    throw new Error("No data received");
  } catch (error) {
    console.log(error);
  }
};
