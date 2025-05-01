"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmployee } from "@/app/_context/EmployeContext";
import { likeEmploye } from "@/lib/Employee/likeEmploye";
import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";

import EmployeDetailProfile from "../_components/EmployeDetailProfile";
import AboutTabs from "../_components/tabs/AboutTabs";
import ReviewsTabs from "../_components/tabs/ReviewsTabs";

export default function EmployeeProfilePage() {
  const params = useParams();
  const id = params.id ?? "";

  const { employees } = useEmployee();
  const { currentUser } = useUser();

  const employee = employees?.find((employee) => employee._id === id);

  const isUserLiked =
    currentUser && employee?.likedBy?.includes(currentUser._id);

  const [isLiked, setIsLiked] = useState(!!isUserLiked);

  if (!employee) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Ажилтан олдсонгүй</h1>
        <p>{id}</p>
      </div>
    );
  }

  const likeHandler = async () => {
    if (!currentUser || !currentUser._id) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй.");
      return;
    }

    try {
      const userId = currentUser._id;
      await likeEmploye(userId, employee._id);
      setIsLiked(!isLiked);
      toast.success("Амжилттай хадгалаа");
    } catch (error) {
      console.error("Like хийхэд алдаа:", error);
      toast.error("Алдаа гарлаа.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto py-4 px-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Буцах
          </Link>
        </div>

        <EmployeDetailProfile
          employee={employee}
          likeHandler={likeHandler}
          isLiked={isLiked}
          currentUser={currentUser}
          id={id as string}
        />

        <div className="container max-w-6xl mx-auto py-8 px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full max-w-md flex mb-8">
              <TabsTrigger value="about" className="cursor-pointer">
                Тухай
              </TabsTrigger>

              <TabsTrigger value="experience" className="cursor-pointer">
                Туршлага
              </TabsTrigger>
              <TabsTrigger value="reviews" className="cursor-pointer">
                Сэтгэгдэл
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <AboutTabs employee={employee} />
            </TabsContent>
            <TabsContent value="reviews" className="space-y-8">
              <ReviewsTabs id={id as string} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
