"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordForm } from "./PasswordForm";
import { AdditionalInfoForm } from "./AdditionalInfoForm";
import { toast } from "sonner";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { changePassword } from "@/lib/profile/change-password-util";
import { useEmployee } from "@/app/_context/EmployeContext";
import { changeAdditionallinfo } from "@/lib/profile/change-additionalI-info";

// // Личныйн формын утгийн интерфейс
// interface PersonalFormValues {
//   surname: string;
//   name: string;
//   email: string;
//   about: string;
// }

// Нууц үгийн формын утгийн интерфейс
interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

// Нэмэлт мэдээллийн формын утгийн интерфейс
interface AdditionalFormValues {
  registerNumber: string;
  phoneNumber: string;
  secondPhone: string;
  address: string;
  experience: string;
}

export default function EmployeProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const { currentEmploye } = useEmployee();
  const [loading, setLoading] = useState(false);

  const onPersonalSubmit = () => {
    toast.success("Хувийн мэclearдээлэл амжилттай хадгалагдлаа");
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    setLoading(true);
    if (currentEmploye) {
      changePassword(currentEmploye?._id, values.newPassword);
      toast.success("Нууц үг амжилттай шинэчлэгдлээ");
    }
    setLoading(false);
  };

  const onAdditionalSubmit = (values: AdditionalFormValues) => {
    if (currentEmploye) {
      changeAdditionallinfo(
        currentEmploye?._id,
        values.registerNumber,
        Number(values.phoneNumber),
        values.address,
        values.experience,
        Number(values.secondPhone)
      );
    }
    toast("Бусад мэдээлэл амжилттай хадгалагдлаа");
  };

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Миний бүртгэл</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-md">
          <TabsTrigger
            value="personal"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Хувийн мэдээлэл
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Нууц үг
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Бусад мэдээлэл
          </TabsTrigger>
        </TabsList>

        <Card className="mt-6 border rounded-lg">
          <CardContent className="pt-6">
            <TabsContent value="personal">
              <PersonalInfoForm
                onSubmit={onPersonalSubmit}
                defaultValues={{
                  about:
                    "Би шинэ зүйлс судлах, аялах дуртай. Мөн хөгжим тоглох миний хобби юм.",
                  surname: currentEmploye?.lastName || "",
                  name: currentEmploye?.firstName || "",
                  email: currentEmploye?.email || "",
                }}
              />
            </TabsContent>

            <TabsContent value="password">
              <PasswordForm onSubmit={onPasswordSubmit} loading={loading} />
            </TabsContent>

            <TabsContent value="payment">
              <AdditionalInfoForm
                onSubmit={onAdditionalSubmit}
                currentEmploye={currentEmploye}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
