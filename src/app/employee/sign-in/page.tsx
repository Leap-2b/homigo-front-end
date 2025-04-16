"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signIn } from "@/lib/Employee-login-utils";

const Page = () => {
  const formSchema = z.object({
    phone: z.string().min(8, {
      message: "Утасны дугаар 8 тоотэй байна",
    }),
    password: z.string().min(2, {
      message: "Нууц үг 2оос дээш үсэгтэй байна",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(Number(values.phone), values.password)
  }
  return (
    <div className="w-screen h-[85vh] flex flex-col justify-center items-center">
      <div className="w-[450px] border border-solid border-gray-300 p-6 flex flex-col gap-10  rounded-xl shadow-lg">
        <div className="text-center flex flex-col gap-3">
          <p className="font-bold text-[25px]">Нэвтрэх</p>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-600 h-[48px] mt-30"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
