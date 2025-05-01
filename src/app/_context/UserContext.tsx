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
import { ratingType, userType } from "@/types/user";
import { Loader } from "@/components/Loading";
import { getRating } from "@/lib/rating/getRating";

type UserContextType = {
  currentUser: userType | null;
  setCurrentUser: Dispatch<React.SetStateAction<userType | null>>;
  isReady: boolean;
  setIsReady: Dispatch<React.SetStateAction<boolean>>;
  ratings: ratingType[];
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [ratings, setRatings] = useState<ratingType[]>([]);

  const fetchData = async () => {
    try {
      const response = await getRating();

      if (response?.data.rating) {
        setRatings(response.data.rating);
      }
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setIsReady(true);
    fetchData();
  }, []);

  if (!isReady)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loader />
      </div>
    );

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isReady,
        setIsReady,
        ratings,
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
