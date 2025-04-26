import { useRouter } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";
import { ClientsignIn } from "@/lib/Client-auth/client-login-utils";
import LoginForm from "./LoginForm";

export default function ClientLoginForm() {
  const router = useRouter();
  const { setCurrentUser } = useUser();

  const handleClientLogin = async (phoneNumber: number, password: string) => {
    const user = await ClientsignIn(phoneNumber, password);
    setCurrentUser(user.user);
    router.push("/");
  };

  return <LoginForm onSubmit={handleClientLogin} />;
}
