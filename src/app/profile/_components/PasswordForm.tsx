"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SocialLoginButtons } from "./SocialLoginButtons";

const passwordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Нууц үг 8-аас олон тэмдэгттэй байх ёстой")
      .regex(/[A-Z]/, "Нууц үг дор хаяж нэг том үсэг агуулсан байх ёстой")
      .regex(/[a-z]/, "Нууц үг дор хаяж нэг жижиг үсэг агуулсан байх ёстой")
      .regex(/[0-9]/, "Нууц үг дор хаяж нэг тоо агуулсан байх ёстой")
      .regex(
        /[^A-Za-z0-9]/,
        "Нууц үг дор хаяж нэг тусгай тэмдэгт агуулсан байх ёстой"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface PasswordFormProps {
  onSubmit: (values: PasswordFormValues) => void;
}

export const PasswordForm = ({ onSubmit }: PasswordFormProps) => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Нууц үг солих</h2>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Шинэ нууц үг</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="•••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нууц үг баталгаажуулах</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="•••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>

      <SocialLoginButtons />
    </>
  );
};
