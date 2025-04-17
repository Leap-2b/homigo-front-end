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
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";

const EmployeFirstStep = ({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
}) => {
  const formSchema = z.object({
    phone: z.string().min(8, {
      message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой",
    }),
    userName: z.string().min(2, {
      message: "Нэр 2оос дээш үсэгтэй байна",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      userName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
          <Home className="text-green-200 w-16 h-16" />
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
          <Building2 className="text-emerald-200 w-14 h-14" />
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
          <MapPin className="text-teal-200 w-12 h-12" />
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
                        <Phone size={16} className="text-green-500" />
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
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <User size={16} className="text-green-500" />
                        Нэр
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Нэр оруулна уу"
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                            {...field}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <User size={16} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600"
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
                      className="text-green-500 mt-0.5 shrink-0"
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

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {["Google", "Facebook"].map((name, i) => (
                <Button key={i} variant="outline" className="border-gray-200">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt={name}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {name}
                </Button>
              ))}
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
            <Shield size={16} className="text-green-500" />
            <span>Мэдээллийг Найдвартай Хадгалах</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={16} className="text-green-500" />
            <span>Үнэгүй Бүртгүүлэх</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EmployeFirstStep;
