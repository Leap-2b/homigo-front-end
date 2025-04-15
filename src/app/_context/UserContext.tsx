import { createContext, ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

type UserContextType = {
  signUp: (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => void;
};
const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const signUp = async (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post("http://localhost:7000/auth/sign-up", {
        userName,
        phone,
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.message || "Алдаа гарлаа.");
      } else {
        toast.success("Амжилттай бүртгэгдлээ!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Бүртгүүлэх үед алдаа гарлаа:", error);
      toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
    }
  };

  return (
    <UserContext.Provider value={{ signUp }}>
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
