"use client";

import { useState } from "react";
import PhoneStep from "./PhoneStep";
import EmailPasswordStep from "./EmailPasswordStep";
import { useEmployee } from "@/app/_context/EmployeContext";

export default function SignupForm() {
    const { signUp } = useEmployee();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        password: "",
    });

    const handlePhoneSubmit = (phone: string) => {
        setFormData((prev) => ({ ...prev, phone }));
        setCurrentStep(2);
    };
    
    const handleEmailPasswordSubmit = (email: string, password: string) => {
        setFormData((prev) => ({ ...prev, email, password }));
        signUp(formData.phone, email, password);
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