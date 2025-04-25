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
import { EmployeeSignUp } from "@/lib/Employee/employee-sign-up-util";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
import { uploadImage } from "@/lib/handle-upload";

import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import { RegistrationFooter } from "./RegistrationFooter";
import { BackgroundElements } from "./BackgroundElements";

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
  return (
    <div>
      <BackgroundElements />

      <div className="w-[550px] border border-gray-300 rounded-lg p-6 flex flex-col gap-10 shadow-lg">
        <div className="text-center flex flex-col gap-3">
          <p className="font-bold text-[25px]">Бүртгүүлэх</p>
          <p className="text-gray-500">Мэдээллээ бөглөж үргэлжлүүлнэ үү</p>
        </div>

        <EmployeeRegistrationForm
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          phoneNumber={phoneNumber}
          email={email}
        />
      </div>

      <RegistrationFooter />
    </div>
  );
};

export default EmployeSecondStep;
