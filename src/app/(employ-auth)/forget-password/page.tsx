import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function PasswordResetForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Нууц үгийг дахин тохируулах
        </h1>

        <p className="mb-8 text-gray-600">
          Өөрийн бүртгэлтэй холбоотой имэйл эсвэл утасны дугаараа оруулна уу.
          Бид танд нууц үг шинэчлэх холбоосыг илгээх болно.
        </p>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-lg font-medium text-gray-900"
          >
            Холбоосыг имэйлээр авах
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-500 focus:border-green-500 focus:outline-none"
            placeholder="Имэйл хаягаа оруулна уу"
          />
        </div>

        <div className="mb-2 flex items-center justify-center">
          <div className="w-full border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500">эсвэл</span>
          <div className="w-full border-t border-gray-200"></div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="mb-2 block text-lg font-medium text-gray-900"
          >
            Холбоосыг SMS-ээр аваарай
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              id="phone"
              className="w-full h-[52px] rounded-lg border border-gray-300 p-4 text-gray-500 focus:border-green-500 focus:outline-none"
              placeholder="phoneNumber"
            />
          </div>
        </div>

        <p className="mb-8 text-center text-sm text-gray-600">
          Хэрэв ямар нэгэн асуудал гарвал,
          <a
            href="mailto:support@armut.com"
            className="text-green-600 hover:underline"
          >
            support@armut.com
          </a>
          -та манай багтай утсаар холбогдож болно.
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-500 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Холбоос илгээх
        </button>
      </div>
    </div>
  );
}
