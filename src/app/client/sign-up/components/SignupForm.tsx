"use client";

import { useState } from "react";
import PhoneStep from "./PhoneStep";
import EmailPasswordStep from "./EmailPasswordStep";
import { useUser } from "@/app/_context/UserContext";

export default function SignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    password: "",
  });
  const  {signUp} = useUser()
 
  const handlePhoneSubmit = (phone: string , userName:string) => {
    setFormData((prev) => ({ ...prev, phone , userName}));
    setCurrentStep(2);
  };
  const handleEmailPasswordSubmit = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password  }));
 signUp(formData.userName, formData.phone, formData.email , formData.password)
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {currentStep === 1 ? (
        <PhoneStep onSubmit={handlePhoneSubmit} />
      ) : (
        <EmailPasswordStep
          onSubmit={handleEmailPasswordSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
