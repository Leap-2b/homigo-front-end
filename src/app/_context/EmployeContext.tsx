"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { toast, Toaster } from "sonner";
import { useUser } from "./UserContext";
type employeeContextType = {
  signUp: (phone: string, email: string, password: string, firstname: string, lastname: string, register: string, address: string, secondPhone: number, experience: string, category: string, products: string) => void;
};

const employeeContext = createContext<employeeContextType>({} as employeeContextType);
export const useEmployee = () => {
  return useContext(employeeContext);
};
const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setIsReady } = useUser()

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(`/api/employee`);
  //       if (!res.ok) {
  //         console.log("Алдаа гарлаа:", res.status);
  //         return;
  //       }
  //       const data = await res.json();
  //     } catch (error) {
  //       console.error("Ажилтны мэдээлэл авахад алдаа гарлаа:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const signUp = async (phone: string, email: string, password: string, firstname: string, lastname: string, register: string, address: string, secondPhone: number, experience: string, category: string, products: string) => {
    try {
      setIsReady(false);
      const response = await fetch("/api/employee/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, password, firstname, lastname, register, address, secondPhone, experience, category, products }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.message || "Бүртгэл амжилтгүй боллоо");
      } else {
        toast.success("Бүртгэл амжилттай үүслээ");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Бүртгэл үүсгэхэд алдаа гарлаа:", error);
      toast.error("Гэнэтийн алдаа гарлаа");
    } finally {
      setIsReady(true);
    }
  };


  return (
    <employeeContext.Provider
      value={{
        signUp,
        // fetchData,
        // loading
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeProvider;