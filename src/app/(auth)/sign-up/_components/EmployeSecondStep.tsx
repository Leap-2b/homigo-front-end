"use client";
import React, { Dispatch, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Camera,
  CheckCircle,
  Home,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { EmployeeSignUp } from "@/lib/Employee-auth-utils.ts/Employee-sign-up-util";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "duivg9iia";
const EmployeSecondStep = ({
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCurrentEmploye } = useEmployee();

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
      about: z.string().min(3, {
        message: "Хаяг хамгийн багадаа 3 тэмдэгт байх ёстой.",
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
      img: z.string().min(1, {
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
      about: "",
      address: "",
      secondPhone: "",
      experience: "",
      category: "",
      img: "",
    },
  });
  const uploadImage = async (file: File | null) => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error: unknown) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const tempImageUrl = URL.createObjectURL(file);
      form.setValue("img", tempImageUrl);
      setPreviewUrl(tempImageUrl);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // Зураг upload хийх
      const imageUrl = await uploadImage(imageFile);

      if (!imageUrl) {
        alert("Зураг амжилттай upload хийгдээгүй байна.");
        return;
      }

      const employee = await EmployeeSignUp(
        phoneNumber,
        email,
        values.password,
        values.firstName,
        values.lastName,
        values.register,
        values.about,
        values.address,
        Number(values.secondPhone),
        values.experience,
        category,
        imageUrl
      );
      setCurrentEmploye(employee);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-50 blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-teal-50 blur-3xl opacity-60"></div>

        <motion.div
          className="absolute top-[15%] left-[15%]"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Home className="text-green-200 w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] right-[20%]"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Building2 className="text-emerald-200 w-14 h-14" />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[15%]"
          animate={{
            y: [0, 8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <MapPin className="text-teal-200 w-12 h-12" />
        </motion.div>
      </div>

      <div className="w-[550px] border border-gray-300 rounded-lg p-6 flex flex-col gap-10 shadow-lg">
        <div className="text-center flex flex-col gap-3">
          <p className="font-bold text-[25px]">Бүртгүүлэх</p>
          <p className="text-gray-500">Мэдээллээ бөглөж үргэлжлүүлнэ үү</p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-5 justify-center cursor-pointer">
            <p className="text-sm mb-4 font-bold">Зураг оруулах</p>
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 "
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Profile preview"
                    width={96}
                    height={96}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Camera className="text-gray-400" />
                )}
              </div>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
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
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
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
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Миний тухай</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Өөрийнхөө товч танилцуулга"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <Input placeholder="Жишээ нь: 1 жил" {...field} />
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
                        <option value="IT">Компьютер засвар</option>
                        <option value="CLEANER">Цэвэрлэгч</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 w-full">
                <Button
                  className="h-[48px] w-[48%]"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Буцах
                </Button>
                <Button
                  type="submit"
                  className=" bg-green-600 h-[48px] w-[48%]"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Үргэлжлүүлэх"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
      <motion.div
        className="mt-8  flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-1">
          <Shield size={16} className="text-green-500" />
          <span>Secure registration</span>
        </div>
        <div className="flex items-center gap-1">
          <User size={16} className="text-green-500" />
          <span>Join 10,000+ users</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={16} className="text-green-500" />
          <span>Free to join</span>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeSecondStep;
