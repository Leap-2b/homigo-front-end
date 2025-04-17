import Image from "next/image";
import Link from "next/link";
import { DropdownSignin, DropdownSignup } from "./Dropdown";
import { useUser } from "@/app/_context/UserContext";
export default function Header() {
  // const { currentUser } = useUser();
  return (
    <div className="w-full">
      {/* Navigation Bar */}
      {/* currentUser? Avatar : LoginButton */}
      <div className="w-full bg-white border-b sticky top-0 z-50">
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex ">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <img src="/Homigo.png" alt="" className="w-15 h-15 " />
              <span className="text-gray-800 font-medium text-xl ml-3">
                HomiGo
              </span>
            </div>
          </Link>
          {/* Navigation Links */}
          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link href="/login">
              <p className="font-bold cursor-pointer">Нэвтрэх</p>
            </Link>
            {/* <DropdownSignin /> */}

            <DropdownSignup />
          </div>
        </div>
      </div>
    </div>
  );
}
