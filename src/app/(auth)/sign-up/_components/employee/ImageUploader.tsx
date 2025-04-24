import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ImageUploader = ({
  previewUrl,
  handleImageChange,
}: {
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col items-center mb-5 justify-center cursor-pointer">
      <p className="text-sm mb-4 font-bold">Зураг оруулах</p>
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
          onClick={() => document.getElementById("photo-upload")?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Profile preview"
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
      </div>
    </div>
  );
};
