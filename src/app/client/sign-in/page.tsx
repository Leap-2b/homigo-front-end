import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="rounded-sm border p-6">
        <div className="w-full flex flex-col gap-40">
          <div className="w-full">
            <div className="flex flex-col items-start p-6  ">
              <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
                Log in to access your account
              </h3>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="text-[16px] font-bold">Email</p>
                <Input type="email" placeholder="Имэйл хаягаа оруулна уу" />
              </div>

              <div className="flex flex-col gap-[10px] items-start  w-full">
                <p className="text-[16px] font-bold">Password</p>
                <Input type="password" placeholder="Паспортоо оруулна уу" />
              </div>

              <Link href={"/reset-password"}>
                <button className="underline text-[14px] cursor-pointer">
                  Reset password
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer h-10 bg-green-500 hover:bg-green-700"
            >
              Continue
            </Button>
            <Toaster richColors />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
