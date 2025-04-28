"use client";
import React, { useState } from "react";
import EmployeFirstStep from "./_components/employee/EmployeFirstStep";
import EmployeSecondStep from "./_components/employee/EmployeSecondStep";
import ClientFirstStep from "./_components/client/ClientFirstStep";
import ClientSecondStep from "./_components/client/ClientSecondStep";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const EmployeSteps = [EmployeFirstStep, EmployeSecondStep][currentStep];
  const ClientSteps = [ClientFirstStep, ClientSecondStep][currentStep];
  return (
    <div className="w-screen mt-6 flex flex-col justify-center items-center">
      <Tabs defaultValue="client" className="w-[550px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
            value="employ"
            className="data-[state=active]:bg-[#3c87f7] data-[state=active]:text-white"
          >
            Ажилтан
          </TabsTrigger>
          <TabsTrigger
            value="client"
            className="data-[state=active]:bg-[#3c87f7] data-[state=active]:text-white"
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
            setPhone={setPhone}
            phone={phone}
            setUserName={setUserName}
            userName={userName}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
