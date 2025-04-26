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

  const renderEmployeeLinks = () => (
    <>
      <Link href="/employeeOrder">
        <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold border-b-2 border-transparent hover:border-green-500 transition-all duration-200 px-3 py-2">
          <span className="text-lg">📋</span>Захиалга
        </p>
      </Link>
      <Link href="/addProduct">
        <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold border-b-2 border-transparent hover:border-green-500 transition-all duration-200 px-3 py-2">
          <span className="text-lg">+</span>Үйлчилгээ нэмэх
        </p>
      </Link>
    </>
  );

  const renderPopoverContent = () => (
    <PopoverContent className="flex flex-col gap-3 w-[200px]">
      {currentEmploye && !currentUser && (
        <Link href={"/profile"}>
          <div className="flex gap-4 items-center cursor-pointer">
            <div className="bg-gray-200 p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <UserPen />
            </div>
            <p className="font-bold">Профайл</p>
          </div>
        </Link>
      )}
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={logoutHandler}
      >
        <div className="bg-gray-200 p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center">
          <LogOut className="w-[20px] h-[20px]" />
        </div>
        <p className="font-bold">Гарах</p>
      </div>
    </PopoverContent>
  );

  return (
    <div className="w-full ">
      <div className="w-full bg-white border-b sticky top-0 z-50">
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image src="/logo.png" alt="logo" width={50} height={44} />
              <span className="text-[#222] font-bold text-xl ml-3 hidden md:block">
                Homi-Go
              </span>
            </div>
          </Link>

          {/* Navigation */}
          {currentUser || currentEmploye ? (
            <div className="flex items-center gap-10">
              {currentEmploye && !currentUser && renderEmployeeLinks()}
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        currentEmploye?.img
                          ? currentEmploye.img
                          : "https://github.com/shadcn.png"
                      }
                      alt="profile-image"
                      className="rounded-full w-[40px] h-[40px]"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                {renderPopoverContent()}
              </Popover>
            </div>
          ) : (
            <div className="flex gap-3">
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
