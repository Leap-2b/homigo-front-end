"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { toast, Toaster } from "sonner";

type employeeType = {
  id: string;
  phone: string;
  email: string;
  password: string;
};

type employeeContextType = {
  employees: employeeType[];
  signUp: (phone: string, email: string, password: string) => void;
  fetchData: () => void;
  loading: boolean;
};

const employeeContext = createContext<employeeContextType>({} as employeeContextType);

export const useEmployee = () => {
  return useContext(employeeContext);
};

const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employee`);
      if (!res.ok) {
        console.log("Алдаа гарлаа:", res.status);
        return;
      }
      const data = await res.json();
      setEmployees(data.employees);
    } catch (error) {
      console.error("Ажилтны мэдээлэл авахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (phone: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/employee/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, password }),
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
    }
  };

  return (
    <employeeContext.Provider
      value={{
        employees,
        signUp,
        fetchData,
        loading
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeProvider;