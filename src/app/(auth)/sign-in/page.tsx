"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Home, MapPin, Shield, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "@/lib/Employee-login-utils";

export default function EnhancedLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const employHandler = () => {
    signIn(Number(phoneNumber), password);
  };
  const clientHandler = () => {};
  return (
    <div className="min-h-[82vh] bg-gradient-to-b mt-30 from-white to-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-teal-50 blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60"></div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-20">
        {/* Decorative icons */}
        <motion.div
          className="absolute left-[10%] top-[15%] text-green-400 opacity-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Home size={48} />
        </motion.div>
        <motion.div
          className="absolute right-[15%] top-[25%] text-emerald-400 opacity-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Building2 size={40} />
        </motion.div>
        <motion.div
          className="absolute left-[20%] bottom-[20%] text-teal-400 opacity-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <MapPin size={36} />
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <Tabs defaultValue="login">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Ажилтан
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Хэрэглэгч
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="p-6">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Нэвтрэх</h1>
                    <p className="text-gray-500 text-sm">
                      Мэдээллээ бөглөн үргэлжлүүлнэ үү
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User size={16} className="text-green-500" />
                        Утасны дугаар
                      </label>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Утасны дугаараа оруулна уу"
                        className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Shield size={16} className="text-green-500" />
                        Нууц үг
                      </label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700"
                      >
                        Нууц үг Сэргээх
                      </a>
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={employHandler}
                    >
                      Нэвтрэх
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-4 text-sm text-gray-500">
                      Бусад сонголт
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-gray-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Google
                    </Button>
                    <Button variant="outline" className="border-gray-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Facebook
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="p-6">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Нэвтрэх</h1>
                    <p className="text-gray-500 text-sm">
                      Мэдээллээ бөглөн үргэлжлүүлнэ үү
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User size={16} className="text-green-500" />
                        Утасны дугаар
                      </label>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Утасны дугаараа оруулна уу"
                        className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Shield size={16} className="text-green-500" />
                        Нууц үг
                      </label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700"
                      >
                        Нууц үг Сэргээх
                      </a>
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={clientHandler}
                    >
                      Нэвтрэх
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-4 text-sm text-gray-500">
                      Бусад сонголт
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-gray-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Google
                    </Button>
                    <Button variant="outline" className="border-gray-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Facebook
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-1">
            <Shield size={16} className="text-green-500" />
            <span>Баталгаатай Нэвтрэх</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} className="text-green-500" />
            <span>10,000+ Хэрэглэгч</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 size={16} className="text-green-500" />
            <span>Найдвартай Ажилтан</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
