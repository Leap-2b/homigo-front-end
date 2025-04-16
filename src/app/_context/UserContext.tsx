"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { userType } from "@/types/user";

type UserContextType = {
  signUp: (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  currentUser: userType | null;
  setCurrentUser: Dispatch<userType>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
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
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  return (
    <UserContext.Provider value={{ signUp, currentUser, setCurrentUser }}>
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
