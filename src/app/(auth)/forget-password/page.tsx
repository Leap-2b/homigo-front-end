"use client";

import { CountryDropdown } from "@/components/country-dropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email("Имэйл хаяг буруу байна").optional(),
    phoneNumber: z
      .string()
      .min(8, "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой")
      .optional(),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Имэйл эсвэл утасны дугаарын аль нэгийг заавал бөглөнө үү.",
    path: ["email"],
  });

export default function First() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🟢 Submitted values:", values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100 ">
      <div className="w-[600px] max-w-md rounded-lg bg-white p-8 shadow-md h-[600px]">
        <h1 className=" text-3xl font-bold text-gray-900">
          Нууц үгийг дахин тохируулах
        </h1>
        <p className="text-[10px] font-bold text-gray-400">
          Нууц үг сэргээх холбоосыг доорх аргуудаар авч болно.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Имэйл хаяг</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[50px]"
                      type="email"
                      placeholder="Имэйл хаягаа оруулна уу"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center text-gray-400">
              <div className="w-full border-t border-gray-200" />
              <span className="mx-3">эсвэл</span>
              <div className="w-full border-t border-gray-200" />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Утасны дугаар</FormLabel>

                  <FormControl>
                    {/* <CountryDropdown
                      placeholder="Country"
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.alpha3);
                      }}
                    /> */}
                    <Input
                      className="h-[50px]"
                      type="tel"
                      placeholder="Утасны дугаараа оруулна уу"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-sm text-gray-500 text-center">
              Хэрэв асуудал гарвал{" "}
              <a
                href="mailto:support@armut.com"
                className="text-green-600 hover:underline"
              >
                support@armut.com
              </a>{" "}
              хаягаар холбогдоно уу.
            </p>

            <Button
              type="submit"
              className="w-full bg-green-500 text-white h-[50px] "
            >
              Үргэлжлүүлэх
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
