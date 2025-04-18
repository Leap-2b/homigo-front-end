"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { userType } from "@/types/user";

type UserContextType = {
  currentUser: userType | null;
  setCurrentUser: Dispatch<userType>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
