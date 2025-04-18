import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, UserCircle } from "lucide-react";
import Link from "next/link";

export function DropdownSignin() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" w-[200px] border-0 shadow-none ">
          <ChevronDown /> Нэвтрэх
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60  ">
        <Link href={"/client/sign-in"}>
          <DropdownMenuItem>
            <User />
            <span className="">Хэрэглэгчээр нэвтрэх</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/employee/sign-in"}>
          <DropdownMenuItem>
            <UserCircle />
            <span className="">Ажилтнаар нэвтрэх</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function DropdownSignup() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[200px] border-0 shadow-none " variant="outline">
          <ChevronDown /> Бүртгүүлэх
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <Link href={"/client/sign-up"}>
          <DropdownMenuItem>
            <User />
            <span className="">Хэрэглэгчээр бүртгүүлэх</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/employee/sign-up"}>
          <DropdownMenuItem>
            <UserCircle />
            <span className="">Ажилтнаар бүртгүүлэх</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
