"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/_context/UserContext";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/_context/EmployeContext";
export default function Header() {
  const { currentUser, setCurrentUser } = useUser();
  const { currentEmploye, setCurrentEmploye } = useEmployee();
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    localStorage.removeItem("employe");
    setCurrentEmploye(null);
    router.push("/sign-in");
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b sticky top-0 z-50">
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex ">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image src="/logo.png" alt="" width={50} height={44} />
              <span className="text-[#222] font-bold text-xl ml-3">
                Homi-Go
              </span>
            </div>
          </Link>
          {currentUser || currentEmploye ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      currentEmploye?.img
                        ? currentEmploye.img
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                    className="rounded-full w-[40px] h-[40px]"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-3 w-[200px]">
                <div className="flex gap-5 items-center cursor-pointer">
                  <div className="bg-gray-200 p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <UserPen />
                  </div>
                  <Link href={"/profile"}>
                    <p className="font-bold">Profile</p>
                  </Link>
                </div>
                <div
                  className="flex gap-5 items-center cursor-pointer"
                  onClick={logoutHandler}
                >
                  <div className="bg-gray-200 p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center ">
                    <LogOut className="w-[20px] h-[20px]" />
                  </div>
                  <p className="font-bold">Log Out</p>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-">
              <motion.div
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Нэвтрэх
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  >
                    Бүртгүүлэх
                  </Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
