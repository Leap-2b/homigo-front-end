"use client";
import { createContext, ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

type UserContextType = {
  signIn: (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  signUp: (phone: string, email: string, password: string) => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const signIn = async (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await axios.post(`${apiUrl}/signin`, {
        userName,
        phone,
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.message || "Алдаа гарлаа.");
      } else {
        toast.success("Амжилттай нэвтэрлээ!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Нэвтрэх үед алдаа гарлаа:", error);
      toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
    }
  };

  const signUp = async (phone: string, email: string, password: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await axios.post(`${apiUrl}/signup`, {
        phone,
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.message || "Алдаа гарлаа.");
      } else {
        toast.success("Бүртгэл амжилттай!");
        router.push("/");
      }
    } catch (error) {
      console.error("Бүртгүүлэх үед алдаа гарлаа:", error);
      toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
    }
  };

  return (
    <UserContext.Provider value={{ signIn, signUp }}>
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
