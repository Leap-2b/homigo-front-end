const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "duivg9iia";
export const uploadImage = async (file: File | null) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.secure_url;
  } catch (error: unknown) {
    console.error("Failed to upload image:", error);
    return null;
  }
};
