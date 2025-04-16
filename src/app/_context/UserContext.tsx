"use client";
import { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

type UserContextType = {
  signUp:  (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  signIn:(phone: string,  password: string) => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = ()=>{
  return useContext(UserContext)
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const signUp = async (
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

  const signIn = async (phone: string,  password: string) => {
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
      }
    } catch (error) {
      console.error("Бүртгүүлэх үед алдаа гарлаа:", error);
      toast.error("Сервертэй холбогдох үед алдаа гарлаа.");
    }
  };

  return (
    <UserContext.Provider value={{signUp , signIn}}>
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
