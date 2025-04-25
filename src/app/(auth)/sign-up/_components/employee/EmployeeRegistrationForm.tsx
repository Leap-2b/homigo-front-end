"use client";

import React, { Dispatch } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { EmployeeSignUp } from "@/lib/Employee-auth/employee-sign-up-util";
import { useEmployee } from "@/app/_context/EmployeContext";
import { uploadImage } from "@/lib/handle-upload";
import { ImageUploader } from "./ImageUploader";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { SecurityFields } from "./SecurityFields";
import { AdditionalInfoFields } from "./AdditionalInfoFields";
import { formSchema } from "./vaidationSchema";

const EmployeeRegistrationForm = ({
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
  const [category, setCategory] = React.useState<string>("");
  const [experience, setExperience] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { setCurrentEmploye, handleRefresh } = useEmployee();

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
        address,
        Number(values.secondPhone),
        experience,
        category,
        imageUrl
      );
      setCurrentEmploye(employee);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    handleRefresh();
    setLoading(false);
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ImageUploader
        previewUrl={previewUrl}
        handleImageChange={handleImageChange}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PersonalInfoFields form={form} />
          <SecurityFields form={form} />
          <AdditionalInfoFields
            form={form}
            setAddress={setAddress}
            setExperience={setExperience}
            setCategory={setCategory}
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
              className="bg-green-600 h-[48px] w-[48%]"
              disabled={loading}
            >
              {loading ? "loading..." : "Үргэлжлүүлэх"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default EmployeeRegistrationForm;
