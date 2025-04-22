"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordForm } from "./PasswordForm";
import { AdditionalInfoForm } from "./AdditionalInfoForm";
import { toast } from "sonner";
import { PersonalInfoForm } from "./PersonalInfoForm";

export default function EmployeProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  const onPersonalSubmit = (values: any) => {
    console.log("Personal form submitted:", values);
    toast.success("Хувийн мэдээлэл амжилттай хадгалагдлаа");
  };

  const onPasswordSubmit = (values: any) => {
    console.log("Password form submitted", values);
    toast.success("Нууц үг амжилттай шинэчлэгдлээ");
  };

  const onAdditionalSubmit = (values: any) => {
    console.log("Additional info submitted:", values);
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
                }}
              />
            </TabsContent>

            <TabsContent value="password">
              <PasswordForm onSubmit={onPasswordSubmit} />
            </TabsContent>

            <TabsContent value="payment">
              <AdditionalInfoForm onSubmit={onAdditionalSubmit} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
