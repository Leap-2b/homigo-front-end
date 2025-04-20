"use client"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Facebook, ChromeIcon as Google, CameraIcon } from "lucide-react"

export default function EmployeProfile() {
  const [activeTab, setActiveTab] = useState("personal")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form submitted")
  }

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Миний бүртгэл</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-md">
          <TabsTrigger
            value="personal"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Хувийн мэдээлэл
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Нууц үг
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Бусад мэдээлэл

          </TabsTrigger>
        </TabsList>

        <Card className="mt-6 border rounded-lg">
          <CardContent className="pt-6">
            <TabsContent value="personal">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Хувийн мэдээлэл</h2>

                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CameraIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                <p className="text-center mb-6 text-gray-500">Зураг нэмэх</p>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-1 mr-2">
                      <Label htmlFor="surname">Овог</Label>
                      <Input id="surname" placeholder="Овог" className="mt-1" />
                    </div>

                    <div className="flex-1 ml-2">
                      <Label htmlFor="name">Нэр</Label>
                      <Input id="name" placeholder="Нэр" className="mt-1" />
                    </div>

                  </div>

                  <div>
                    <Label htmlFor="about">Тухай</Label>
                    <Textarea
                      id="about"
                      placeholder="Би шинэ зүйлс судлах, аялах дуртай. Мөн хөгжим тоглох миний хобби юм."
                      className="mt-1 min-h-[120px]"
                      defaultValue="Би шинэ зүйлс судлах, аялах дуртай. Мөн хөгжим тоглох миний хобби юм."
                    />
                  </div>

                  <div>
                    <Label htmlFor="social">Емайл хаяг</Label>
                    <Input type="email" placeholder="Емайл оруулна уу" className="mt-1" />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Хадгалах
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Нууц үг солих</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-password">Шинэ нууц үг</Label>
                    <Input id="new-password" type="password" placeholder="•••••••" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Нууц үг баталгаажуулах</Label>
                    <Input id="confirm-password" type="password" placeholder="•••••••" className="mt-1" />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Хадгалах
                  </Button>
                </div>
              </form>

              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Бусад сонголтууд</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                    Google
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook h-4 w-4 text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6">Бусад мэдээлэл</h2>

                <div className="space-y-4">
                <div className="flex">
                  <div className="flex-1 mr-2">
                  <Label htmlFor="register-number">Регистрийн дугаар</Label>
                  <Input id="register-number" placeholder="Регистрийн дугаар" className="mt-1" />
                  </div>

                  <div className="flex-1 ml-2">
                  <Label htmlFor="phone-number">Утасны дугаар</Label>
                  <Input id="phone-number" placeholder="Утасны дугаар" className="mt-1" />
                  </div>

                  </div>
                  <div>
                  <Label htmlFor="address">Хаяг</Label>
                  <Textarea
                    id="address"
                    placeholder="Хаягаа оруулна уу"
                    className="mt-1 min-h-[80px]"
                  />
                  </div>

                  <div>
                  <Label htmlFor="experience">Туршлага</Label>
                  <Textarea
                    id="experience"
                    placeholder="Туршлагаа оруулна уу"
                    className="mt-1 min-h-[80px]"
                  />
                  </div>
                  <div>
                  <Label htmlFor="emergency-contact">Гэр бүлийн нэг хүний дугаар</Label>
                  <Input id="emergency-contact" placeholder="Гэр бүлийн нэг хүний дугаар" className="mt-1" />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Хадгалах
                  </Button>
                </div>
              </form>

              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Бусад сонголтууд</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                    Google
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook h-4 w-4 text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
