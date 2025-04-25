"use client";
import { motion } from "framer-motion";

import { Building2, Home, MapPin, Shield, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";
import { useEmployee } from "@/app/_context/EmployeContext";
import { ClientsignIn } from "@/lib/Client-auth/client-login-utils";
import { signIn } from "@/lib/Employee/employee-login-utils";

import LoginTabs from "./LoginTabs";
import TrustIndicators from "./TrustIndicators";
import BackgroundElements from "./BackgroundElements";
import { useState } from "react";

export default function EnhancedLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setCurrentUser } = useUser();
  const { setCurrentEmploye, handleRefresh } = useEmployee();

  const employHandler = async () => {
    setLoading(true);
    try {
      const employe = await signIn(Number(phoneNumber), password);
      console.log(employe);
      setCurrentEmploye(employe);

      router.push("/");
    } catch (error) {
      console.log("Хэрэглэгч нэвтрэх үед алдаа гарлаа:", error);
    } finally {
      handleRefresh();
      setLoading(false);
    }
  };

  const clientHandler = async () => {
    setLoading(true);
    try {
      const user = await ClientsignIn(Number(phoneNumber), password);
      setCurrentUser(user);

      router.push("/");
    } catch (error) {
      console.log("Хэрэглэгч нэвтрэх үед алдаа гарлаа", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[82vh] bg-gradient-to-b mt-30 from-white to-gray-50">
      <BackgroundElements />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <LoginTabs />
          </div>
        </motion.div>

        <TrustIndicators />
      </main>
    </div>
  );
}
