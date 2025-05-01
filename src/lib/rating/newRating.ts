export const createRating = async (
  rating: number,
  id: string,
  comments: string
) => {
  try {
    const response = await fetch("/api/rating/createRating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        employeId: id,
        comments,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
};
