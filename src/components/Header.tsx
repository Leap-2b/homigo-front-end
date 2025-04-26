"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Menu, UserIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Header() {
  // Replace context with local state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentEmploye, setCurrentEmploye] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Check localStorage on component mount (client-side only)
  useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        const savedEmployee = localStorage.getItem("employe");
        if (savedUser) setCurrentUser(JSON.parse(savedUser));
        if (savedEmployee) setCurrentEmploye(JSON.parse(savedEmployee));
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
  });

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
        <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3 md:px-8 relative">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image src="/logo.png" alt="logo" width={50} height={44} />
              <span className="text-[#222] font-bold text-xl ml-3 hidden md:block">
                Homi-Go
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-10">
              <Link href="/order">
                <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold border-b-2 border-transparent hover:border-green-500 transition-all duration-200 px-3 py-2 text-sm md:text-base">
                  <span className="text-lg">📋</span>Захиалга
                </p>
              </Link>
              <Link href="/addProduct">
                <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold border-b-2 border-transparent hover:border-green-500 transition-all duration-200 px-3 py-2 text-sm md:text-base">
                  <span className="text-lg">+</span>Үйлчилгээ нэмэх
                </p>
              </Link>
            </div>


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
                      alt="profile-image"
                      className="rounded-full w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="flex flex-col gap-3 w-[200px] sm:w-[250px]">
                  {currentEmploye && !currentUser && (
                    <Link href={"/profile"}>
                      <div className="flex gap-4 items-center cursor-pointer">
                        <div className="bg-gray-200 p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center">
                          <UserIcon />
                        </div>
                        <p className="font-bold text-sm sm:text-base">
                          Профайл
                        </p>
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
                    <p className="font-bold text-sm sm:text-base">Гарах</p>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="hidden md:flex gap-3">
                <motion.div
                  className="flex items-center space-x-2"
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

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 space-y-3">
              <Link href="/order" onClick={() => setMobileMenuOpen(false)}>
                <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold py-2">
                  <span className="text-lg">📋</span>Захиалга
                </p>
              </Link>
              <Link href="/addProduct" onClick={() => setMobileMenuOpen(false)}>
                <p className="flex items-center gap-2 text-black hover:text-green-500 font-semibold py-2">
                  <span className="text-lg">+</span>Үйлчилгээ нэмэх
                </p>
              </Link>
              {!currentUser && !currentEmploye && (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700 hover:text-gray-900"
                    >
                      Нэвтрэх
                    </Button>
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      Бүртгүүлэх
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
