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
import { signIn } from "@/lib/login-utils";
import { useState } from "react";

const LoginPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    const user = await signIn(userName, password);
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div className="h-[85vh] w-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Нэвтрэх</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Хэргэлэгч</Label>
              <Input
                id="name"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Хэргэлэгч"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Нууц үг</Label>
              <Input
                id="name"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex ml-auto">
          <Button onClick={onLogin}>Нэвтрэх</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
