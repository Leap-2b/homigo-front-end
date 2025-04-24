import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/_context/EmployeContext";
import { signIn } from "@/lib/Employee-auth/employee-login-utils";
import LoginForm from "./LoginForm";

export default function EmployeeLoginForm() {
  const router = useRouter();
  const { setCurrentEmploye } = useEmployee();

  const handleEmployeeLogin = async (phoneNumber: number, password: string) => {
    const employe = await signIn(phoneNumber, password);
    console.log(employe);
    setCurrentEmploye(employe);
    router.push("/");
  };

  return <LoginForm onSubmit={handleEmployeeLogin} />;
}
