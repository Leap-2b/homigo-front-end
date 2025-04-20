"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast, Toaster } from "sonner";
import { useUser } from "./UserContext";
import { employeType } from "@/types/user";
import { fetchAllEmployees } from "@/lib/get-all-category";
type employeeContextType = {
  signUp: (
    phone: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    register: string,
    address: string,
    secondPhone: number,
    experience: string,
    category: string,
    products: string
  ) => void;
  currentEmploye: employeType | null;
  setCurrentEmploye: Dispatch<employeType | null>;
  employees: employeType[] | null;
};

const employeeContext = createContext<employeeContextType>(
  {} as employeeContextType
);
export const useEmployee = () => {
  return useContext(employeeContext);
};
const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setIsReady } = useUser();
  const [currentEmploye, setCurrentEmploye] = useState<employeType | null>(
    null
  );
  const [employees, setEmployees] = useState<employeType[] | null>(null);

  const signUp = async (
    phone: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    register: string,
    address: string,
    secondPhone: number,
    experience: string,
    category: string,
    products: string
  ) => {
    try {
      setIsReady(false);
      const response = await fetch("/api/employee/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          email,
          password,
          firstname,
          lastname,
          register,
          address,
          secondPhone,
          experience,
          category,
          products,
        }),
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

  useEffect(() => {
    const employe = localStorage.getItem("employe");
    if (employe) {
      setCurrentEmploye(JSON.parse(employe));
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data: employeType[] | undefined = await fetchAllEmployees();
      if (data) {
        setEmployees(data);
      }
    };
    fetchData();
  }, []);

  return (
    <employeeContext.Provider
      value={{
        signUp,
        currentEmploye,
        setCurrentEmploye,
        employees,
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeProvider;
