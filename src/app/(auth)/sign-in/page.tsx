"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must include at least one UPPERCASE letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must include at least one number.",
    }),
});

const LoginPage = ({
  SecondStep,
  email,
  password,
}: {
  SecondStep: string;
  email: string;
  password: string;
}) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const loginUser = async (email: string, password: string) => {
  //   try {
  //     const { data } = await axios.post("/api/login", {
  //       email,
  //       password,
  //     });
  //     // const response = await fetch("/api/login", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({ email, password }),
  //     // });
  //     // const data = await response.json();
  //     console.log("front-login", data);
  //     toast.success("Login successfully-68");
  //     localStorage.setItem("userId", data.user.id);

  //     if (data.user.name) {
  //       router.push("/view-page");
  //     } else {
  //       router.push("/profile");
  //     }
  //   } catch (error) {
  //     toast.error("Wrong password!");
  //   }
  // };

  useEffect(() => {
    const getUserName = localStorage.getItem("userName");
    setUserName(getUserName);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // loginUser(values.email, values.password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-sm border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[407px] flex flex-col items-start rounded-lg  "
          >
            <div className="w-full flex flex-col gap-40">
              <div className="w-full">
                <div className="flex flex-col items-start p-6  ">
                  <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
                    Log in to access your account
                  </h3>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                      <div className="flex flex-col items-start gap-2 w-full  ">
                        <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email here" {...field} />
                        </FormControl>
                      </div>

                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                      <div className="flex flex-col items-start gap-2 w-full  ">
                        <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter password here"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                      </div>
                      {/* <div className="flex flex-col items-start gap-2 w-full  ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Reset password
                  </FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Enter password here"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                </div> */}
                      <Link href={"/reset-password"}>
                        <button className="underline text-[14px] cursor-pointer">
                          Reset password
                        </button>
                      </Link>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full cursor-pointer h-10 bg-green-500 hover:bg-green-900"
                >
                  Continue
                </Button>
                <Toaster richColors />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
