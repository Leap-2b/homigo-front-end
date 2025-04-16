"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  userName: z
    .string()
    .min(2, { message: "Phone number must be at least 8 digits" }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

interface PhoneStepProps {
  onSubmit: (phone: string, userName: string) => void;
}
export default function PhoneStep({ onSubmit }: PhoneStepProps) {
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      userName: "",
    },
    mode: "onChange",
  });

  const handleSubmit = (data: PhoneFormValues) => {
    onSubmit(data.phone, data.userName);
  };

  return (
    <div>
      <div className="flex justify-end mb-8">
        <Link href="/sign-in">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </Link>
      </div>
      <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Enter your phone number to get started
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      className="h-12"
                    />
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
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your User Name"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 mt-4 bg-[#008D3E] text-white hover:bg-[#008D3E]/90"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
