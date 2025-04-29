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
import { employeType, orderType } from "@/types/user";
import { fetchAllEmployees } from "@/lib/Employee/get-all-employe";
import axios from "axios";

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
  handleRefresh: () => void;
  // fetchOrders: (id: string) => Promise<orderType[]>;
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
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

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

  const getCurrentEmployee = async () => {
    const localEmployee = localStorage.getItem("employe");
    if (!localEmployee) {
      return;
    }
    const employee = JSON.parse(localEmployee);
    try {
      const { data } = await axios.post("/api/employee/getCurrentEmployee", {
        id: employee._id,
      });
      setCurrentEmploye(data.EmployWithProducts);
      localStorage.setItem("employe", JSON.stringify(data.EmployWithProducts));
    } catch (error) {
      console.log("ERROR IN GET CURRENT", error);
    } finally {
      setIsReady(true);
    }
  };

  // const fetchOrders = async (id: string): Promise<orderType[]> => {
  //   try {
  //     const data = await EmployeeGetOrder(id);
  //     return data;
  //   } catch (error) {
  //     console.error("Захиалгыг татаж чадсангүй:", error);
  //     return [];
  //   }
  // };

  useEffect(() => {
    getCurrentEmployee();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const data: employeType[] | undefined = await fetchAllEmployees();
      if (data) {
        setEmployees(data);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <employeeContext.Provider
      value={{
        signUp,
        currentEmploye,
        setCurrentEmploye,
        employees,
        handleRefresh,
        // fetchOrders,
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeProvider;
