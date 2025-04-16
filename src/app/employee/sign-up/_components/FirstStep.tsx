"use client";
import React, { Dispatch } from "react";
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
const FirstStep = ({
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
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Please enter a valid email address." }),
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
    <div className="w-[450px] border border-solid border-gray-300 rounded-lg p-6 flex flex-col gap-10  rounded-xl shadow-lg">
      <div className="text-center flex flex-col gap-3">
        <p className="font-bold text-[25px]">Бүртгүүлэх</p>
        <p className="text-gray-500">Мэдээллээ бөглөн үргэлжлүүлнэ үү</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
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
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-green-600 h-[48px] mt-30">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;
