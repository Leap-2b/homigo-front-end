import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function DropdownSignin() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">signin</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={"/client/sign-in"}>
          <DropdownMenuItem>
            <span>User</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/employee/sign-in"}>
          <DropdownMenuItem>
            <span>Employee</span>
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
        <Button variant="outline">signup</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={"/client/sign-up"}>
          <DropdownMenuItem>
            <span>User</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/employee/sign-up"}>
          <DropdownMenuItem>
            <span>Employee</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
