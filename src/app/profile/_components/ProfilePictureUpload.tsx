import { CameraIcon } from "lucide-react";

export const ProfilePictureUpload = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <CameraIcon className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
