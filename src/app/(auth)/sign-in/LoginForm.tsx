import { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialLoginButtons from "./SocialLoginButtons";

type LoginFormProps = {
  title?: string;
  description?: string;
  onSubmit: (phoneNumber: number, password: string) => Promise<void>;
  buttonText?: string;
};

export default function LoginForm({
  title = "Нэвтрэх",
  description = "Мэдээллээ бөглөн үргэлжлүүлнэ үү",
  onSubmit,
  buttonText = "Нэвтрэх",
}: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(Number(phoneNumber), password);
    } catch (error) {
      console.log("Хэрэглэгч нэвтрэх үед алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSubmit(Number(phoneNumber), password);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phoneNumber, password]);

  return (
    <div className="space-y-6 max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User size={16} className="text-[#2672e4]" />
            Утасны дугаар
          </label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Утасны дугаараа оруулна уу"
            className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Shield size={16} className="text-[#2672e4]" />
            Нууц үг
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full"
          />
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#3c87f7] hover:text-[#2672e4]">
            Нууц үг Сэргээх
          </a>
        </div>

        <Button
          className="w-full bg-[#3c87f7] hover:bg-[#2672e4]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "loading..." : buttonText}
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative bg-white px-4 text-sm text-gray-500">
          Бусад сонголт
        </div>
      </div>

      <SocialLoginButtons />
    </div>
  );
}
