"use client";
import React, { Dispatch, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

const SecondStep = ({
  setCurrentStep,
  currentStep,
  phoneNumber,
  email,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  phoneNumber: number;
  email: string;
}) => {
  const [category, setCategory] = useState<string>("");

  const formSchema = z
    .object({
      password: z.string().min(6, {
        message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.",
      }),
      confirmPassword: z.string().min(6, {
        message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.",
      }),
      firstName: z.string().min(3, {
        message: "Нэр хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
      lastName: z.string().min(3, {
        message: "Овог хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
      register: z.string().regex(/^[А-ЯӨҮ]{2}\d{8}$/, {
        message:
          "Регистрийн дугаар нь эхэндээ 2 кирилл үсэг, дараа нь 8 оронтой тоо байх ёстой.",
      }),
      address: z.string().min(3, {
        message: "Хаяг хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
      secondPhone: z.string().min(3, {
        message: "Утасны дугаар хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
      experience: z.string().min(3, {
        message: "Туршлага хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
      category: z.string().min(2, {
        message: "Ажлын төрөл хамгийн багадаа 3 тэмдэгт байх ёстой.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Нууц үг таарахгүй байна.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      register: "",
      address: "",
      secondPhone: "",
      experience: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(phoneNumber);
    console.log(email);
  }

  return (
    <div className="w-[550px] border border-gray-300 rounded-lg p-6 flex flex-col gap-10 shadow-lg">
      <div className="text-center flex flex-col gap-3">
        <p className="font-bold text-[25px]">Бүртгүүлэх</p>
        <p className="text-gray-500">Мэдээллээ бөглөн үргэлжлүүлнэ үү</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input placeholder="Нэр" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Овог</FormLabel>
                  <FormControl>
                    <Input placeholder="Овог" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="register"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Регистрийн дугаар</FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ: УН12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondPhone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Гэр бүлийн нэг хүний дугаар</FormLabel>
                <FormControl>
                  <Input placeholder="Утасны дугаар" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Нууц үг</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Нууц үг давтах</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Гэрийн хаяг</FormLabel>
                <FormControl>
                  <Textarea placeholder="Хаяг" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ажлын туршлага</FormLabel>
                <FormControl>
                  <Textarea placeholder="Туршлага" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ажлын төрөл</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border rounded-md"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="">Сонгох</option>
                    <option value="IT">IT Компьютер засвар</option>
                    <option value="CLEANER">Цэвэрлэгч</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-5 w-full">
            <Button type="submit" className=" bg-green-600 h-[48px] w-full">
              Үргэлжлүүлэх
            </Button>
            <Button
              className=" bg-green-600 w-full h-[48px]"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Буцах
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;
