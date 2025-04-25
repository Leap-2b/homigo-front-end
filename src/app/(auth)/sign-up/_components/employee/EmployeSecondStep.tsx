"use client";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import { RegistrationFooter } from "./RegistrationFooter";
import { BackgroundElements } from "./BackgroundElements";
import { Dispatch } from "react";

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
