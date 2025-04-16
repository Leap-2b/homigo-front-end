import Image from "next/image";
import Link from "next/link";
import { DropdownSignin, DropdownSignup } from "./Dropdown";
export default function NavBar() {
  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <div className="w-full bg-white border-b sticky top-0 z-50">
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex ">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image
                src="/avatar.svg"
                alt=""
                width={50}
                height={50}
                className="w-2 h-2 bg-green-500 rounded-full absolute left-0"
              />

              <span className="text-gray-800 font-medium text-xl ml-3">
                Homi-go
              </span>
            </div>
          </Link>
          {/* Navigation Links */}
          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <DropdownSignin />

            <DropdownSignup />
          </div>
        </div>
      </div>
    </div>
  );
}
