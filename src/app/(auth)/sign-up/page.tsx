"use client";
import React, { useState } from "react";
import EmployeFirstStep from "./_components/EmployeFirstStep";
import EmployeSecondStep from "./_components/EmployeSecondStep";
import ClientFirstStep from "./_components/ClientFirstStep";
import ClientSecondStep from "./_components/ClientSecondStep";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const EmployeSteps = [EmployeFirstStep, EmployeSecondStep][currentStep];
  const ClientSteps = [ClientFirstStep, ClientSecondStep][currentStep];
  return (
    <div className="w-screen h-[85vh] flex flex-col justify-center items-center">
      <Tabs defaultValue="client" className="w-[550px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
            value="employ"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Ажилтан
          </TabsTrigger>
          <TabsTrigger
            value="client"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Хэрэглэгч
          </TabsTrigger>
        </TabsList>
        <TabsContent value="employ">
          <EmployeSteps
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
          />
        </TabsContent>
        <TabsContent value="client">
          <ClientSteps
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
