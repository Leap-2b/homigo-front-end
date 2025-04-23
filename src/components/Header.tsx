"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/_context/UserContext";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/_context/EmployeContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmployeService from "./EmployeService";

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
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image src="/logo.png" alt="logo" width={50} height={44} />
              <span className="text-[#222] font-bold text-xl ml-3">
                Homi-Go
              </span>
            </div>
          </Link>

          {currentEmploye ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm font-semibold rounded-xl border-gray-300 hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer"
                >
                  үйлчилгээ
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <EmployeService />
              </DialogContent>
            </Dialog>
          ) : (
            ""
          )}
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
                    className="rounded-full w-[40px] h-[40px]"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

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
            </Popover>
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
