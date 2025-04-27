"use client";
import React, { Dispatch } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Building2,
  CheckCircle,
  Home,
  Mail,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import Image from "next/image";

const EmployeFirstStep = ({
  setCurrentStep,
  currentStep,
  setPhoneNumber,
  setEmail,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  setPhoneNumber: Dispatch<number>;
  setEmail: Dispatch<string>;
}) => {
  const formSchema = z.object({
    phone: z.string().min(8, {
      message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой",
    }),
    email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPhoneNumber(Number(values.phone));
    setEmail(values.email);
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-50 blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-teal-50 blur-3xl opacity-60"></div>

        <motion.div
          className="absolute top-[15%] left-[15%]"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Home className="text-[#3c87f7] opacity-20 w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[20%]"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Building2 className="text-[#3c87f7] opacity-20 w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-[15%]"
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <MapPin className="text-[#3c87f7] opacity-20 w-12 h-12" />
        </motion.div>
      </div>
      <main className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-white w-[550px] rounded-xl shadow-lg border border-gray-100 overflow-hidden p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Бүртгүүлэх</h1>
              <p className="text-gray-500 text-sm">
                Мэдээллээ бөглөн үргэлжлүүлнэ үү
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Phone size={16} className="text-[#2672e4]" />
                        Утасны дугаар
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="tel"
                            placeholder="Утасны дугаар оруулна уу"
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Phone size={16} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Mail size={16} className="text-[#2672e4]" />
                        Емайл
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Емайл оруулна уу"
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={16} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#3c87f7] hover:bg-[#2672e4]"
                >
                  үргэлжлүүлэх
                </Button>
              </form>
            </Form>

            {/* Benefits */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700">
                Яагаад Homigo Бүртгүүлэх ёстой вэ
              </h3>
              <ul className="space-y-2">
                {[
                  "Амар хялбар хүссэн зүйлээ олох боломж",
                  "Найдвартай баталгаатай үйлчилгээ",
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#2672e4] mt-0.5 shrink-0"
                    />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Divider */}
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
    <svg
      className="h-4 w-4 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      ></path>
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      ></path>
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      ></path>
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      ></path>
    </svg>
    Google
  </Button>

  <Button variant="outline" className="border-gray-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-2 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a4cefa"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
    Facebook
  </Button>
</div>
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
            <Shield size={16} className="text-[#2672e4]" />
            <span>Мэдээллийг Найдвартай Хадгалах</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={16} className="text-[#2672e4]" />
            <span>Үнэгүй Бүртгүүлэх</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EmployeFirstStep;
