import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const signIn = async (phone: string, password: string) => {
  const router = useRouter();
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await axios.post(`${apiUrl}/signup`, {
      phone,
      password,
    });

    const data = response.data;

    if (data.error) {
      toast.error(data.message || "Алдаа гарлаа.");
    } else {
      toast.success("Бүртгэл амжилттай!");
      router.push("/");
      return data;
    }
  } catch (error) {
    console.error("Бүртгүүлэх үед алдаа гарлаа:", error);
    toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
  }
};
