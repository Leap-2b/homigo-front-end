"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useEmployee } from "@/app/_context/EmployeContext";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "duivg9iia";

export const ProfilePictureUpload = () => {
  const { currentEmploye } = useEmployee();
  console.log("medeeeleell!!!!!!!", currentEmploye);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uploadImage = async (file: File | null) => {
    if (!file) return null;
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
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const tempImageUrl = URL.createObjectURL(file);
      setPreviewUrl(tempImageUrl);

      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setValue("avatarimage", uploadedUrl, { shouldValidate: true });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-24 h-24 rounded-full border-2 ${
          errors.avatarimage
            ? "border-red-500"
            : "border-dashed border-gray-300"
        } flex items-center justify-center bg-gray-50 cursor-pointer`}
        onClick={() => document.getElementById("photo-upload")?.click()}
      >
        {previewUrl || (currentEmploye && currentEmploye.img) ? (
          <Image
            src={previewUrl || currentEmploye!.img}
            alt="Profile"
            width={96}
            height={96}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Camera className="text-gray-400" />
        )}
      </div>

      <Input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <input
        type="hidden"
        {...register("avatarimage", {
          required: "Зураг оруулах шаардлагатай!",
        })}
      />
      {errors.avatarimage && (
        <p className="text-red-500 text-sm">
          {errors.avatarimage.message as string}
        </p>
      )}
    </div>
  );
};
