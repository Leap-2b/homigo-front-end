"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Toaster } from "@/components/ui/sonner";
import { userType } from "@/types/user";
import { Loader } from "@/components/Loading";

type UserContextType = {
  currentUser: userType | null;
  setCurrentUser: Dispatch<userType | null>;
  isReady: boolean;
  setIsReady: Dispatch<boolean>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setIsReady(true);
  }, []);

  if (!isReady)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loader />
      </div>
    );

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isReady, setIsReady }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
