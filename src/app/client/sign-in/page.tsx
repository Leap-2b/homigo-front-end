"use client";
import { useUser } from "@/app/_context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/Client-login-utils";
import { useState } from "react";

const LoginPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    const user = await signIn(userName, password);
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div className="w-screen h-[85vh] flex flex-col justify-center items-center">
      <Card className="w-[450px] border border-solid border-gray-300 p-6 flex flex-col gap-10  rounded-xl shadow-lg space-y-3">
        {/* <div className="text-center flex flex-col gap-3">
            <p className="font-bold text-[25px]">Нэвтрэх</p>
            <p className="text-gray-500">Мэдээллээ бөглөн үргэлжлүүлнэ үү</p>
          </div> */}
        <CardHeader className="flex flex-col justify-center items-center gap-3">
          <CardTitle className="font-bold text-[25px] flex justify-center">
            Нэвтрэх
          </CardTitle>
          <p className="text-gray-500">Мэдээллээ бөглөн үргэлжлүүлнэ үү</p>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="font-bold">
                Хэрэглэгч
              </Label>
              <Input
                id="name"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Нэвтрэх нэрээ оруулна уу"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="font-bold">
                Нууц үг
              </Label>
              <Input
                id="name"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Нууц үгээ оруулна уу"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="">
          <Button
            onClick={onLogin}
            className="w-full bg-green-600 h-[48px] mt-30"
          >
            Нэвтрэх
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
