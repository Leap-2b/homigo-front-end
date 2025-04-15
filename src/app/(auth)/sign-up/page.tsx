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
import { useState, useEffect } from "react";
import Link from "next/link";

// 1. Update validation schema
const phoneFormSchema = z.object({
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

type PhoneFormValues = z.infer<typeof phoneFormSchema>;

interface FirstStepProps {
  onPhoneSubmit: (data: PhoneFormValues) => void;
  isPhoneAvailable: boolean;
  checkPhoneAvailability: (value: string) => void;
}

export default function FirstStep({
  onPhoneSubmit,
  isPhoneAvailable,
  checkPhoneAvailability,
}: FirstStepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onChange",
  });

  const phone = phoneForm.watch("phone");
  const isPhoneValid = phone.length >= 10;

  useEffect(() => {
    if (isPhoneValid && hasInteracted) {
      const checkPhone = async () => {
        setIsChecking(true);

        try {
          const response = await fetch(
            `/api/check-phone?phone=${phone}`,
            {
              method: "GET",
            }
          );

          const data = await response.json();
          checkPhoneAvailability(data.exists);
        } catch (error) {
          console.error("Error checking phone:", error);
          checkPhoneAvailability("");
        } finally {
          setIsChecking(false);
        }
      };

      const timeoutId = setTimeout(checkPhone, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [phone, checkPhoneAvailability, hasInteracted]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    phoneForm.setValue("phone", value);
    setHasInteracted(true);

    if (value.length < 10) {
      checkPhoneAvailability("");
    }
  };

  const isButtonEnabled = () => {
    return isPhoneValid && (isPhoneAvailable || !hasInteracted);
  };

  return (
    <div className="items-center justify-center w-[518px] m-auto border-2 rounded-2xl h-[700px] ">
      <div className=" justify-end mb-8">
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Phone Number</h1>
        <p className="text-muted-foreground">
          Enter your phone number to get started
        </p>
      </div>

      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
          className="space-y-4"
        >
          <FormField
            control={phoneForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    onChange={handlePhoneChange}
                    className={`border-gray-300 ${
                      hasInteracted && isPhoneValid && !isPhoneAvailable
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                {hasInteracted && isPhoneValid && (
                  <div className="flex items-center mt-1 text-sm">
                    {isChecking ? (
                      <div className="text-gray-500">
                        Checking availability...
                      </div>
                    ) : isPhoneAvailable ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-green-500">
                          Phone number available
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                        <span className="text-red-500">
                          This phone number is already registered
                        </span>
                      </>
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`w-full ${
              isButtonEnabled()
                ? "bg-black text-white hover:bg-black/90"
                : "bg-gray-200 text-gray-500"
            }`}
            disabled={!isButtonEnabled() || isChecking}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}