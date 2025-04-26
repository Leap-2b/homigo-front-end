import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/_context/EmployeContext";

import LoginForm from "./LoginForm";
import { signIn } from "@/lib/Employee/employee-login-utils";

export default function EmployeeLoginForm() {
  const router = useRouter();
  const { setCurrentEmploye } = useEmployee();

  const handleEmployeeLogin = async (phoneNumber: number, password: string) => {
    const employe = await signIn(phoneNumber, password);
    setCurrentEmploye(employe);
    router.push("/");
  };

  return <LoginForm onSubmit={handleEmployeeLogin} />;
}
