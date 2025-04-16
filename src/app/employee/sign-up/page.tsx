"use client";
import React, { useState } from "react";
import FirstStep from "./_components/FirstStep";
import SecondStep from "./_components/SecondStep";

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const Allsteps = [FirstStep, SecondStep][currentStep];
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Allsteps
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
};

export default Page;
