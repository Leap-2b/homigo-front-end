"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  Handshake,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmployee } from "@/app/_context/EmployeContext";

import { productsType } from "@/types/user";
import { likeEmploye } from "@/lib/Employee/likeEmploye";
import { useUser } from "@/app/_context/UserContext";
import { toast } from "sonner";
import Order from "../_components/Order";

export default function EmployeeProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [isLiked, setIsLiked] = useState(false);

  const { employees } = useEmployee();
  const { currentUser } = useUser();

  const employee = employees?.find((employee) => employee._id == id);

  if (!employee) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Ажилтан олдсонгүй</h1>
        <p>{id}</p>
      </div>
    );
  }

  const likeHandler = async () => {
    try {
      if (employee && currentUser) {
        await likeEmploye(currentUser._id, employee._id);
        setIsLiked(!isLiked);
        toast.success("Амжилттай хадгалаа");
      }
    } catch (error) {
      console.error("Like хийхэд алдаа:", error);
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

        <div className="bg-white border-b">
          <div className="container max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
                  <Image
                    src={employee?.img || "/placeholder.svg"}
                    alt="zurag"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                          {employee?.firstName}
                        </h1>
                        <p className="text-lg text-gray-600">
                          {employee?.lastName}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => likeHandler()}
                        >
                          <Heart
                            className={`w-4 h-4 mr-2 ${
                              isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                          Хадгалах
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Хуваалцах
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(1)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {employee?.firstName} ({employee?.firstName}{" "}
                          сэтгэгдэл)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{employee?.address}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{employee?.experience}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg font-bold">10</span>
                        <span className="text-sm text-gray-600">
                          Дууссан ажил
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg font-bold">
                          1 цагийн дотор
                        </span>
                        <span className="text-sm text-gray-600">
                          Хариу өгөх хугацаа
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg font-bold">тохиролцоно</span>
                        <span className="text-sm text-gray-600">
                          Үнийн санал
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full md:w-auto">
                          <Handshake className="w-5 h-5 " />
                          Захиалах
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle></DialogTitle>
                        {currentUser && (
                          <Order
                            employee={employee}
                            currentUser={currentUser}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full max-w-md flex  mb-8">
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
              <div className="flex flex-col gap-5">
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Миний тухай</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {employee?.about}
                  </p>
                </div>
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Үйлчилгээнүүд</h2>
                  <div className="flex flex-col gap-3">
                    {employee.products && employee.products.length > 0 ? (
                      employee.products.map((product: productsType) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-lg border shadow-sm p-6"
                        >
                          <h2 className="text-xl font-bold mb-2">
                            {product.name}
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Үнэ:</span>
                              <span className="font-bold">
                                {product.price}₮
                              </span>
                            </div>
                          </div>

                          <Button className="mt-4">Захиалах</Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 p-6 border border-dashed rounded-lg">
                        Одоогоор ямар нэгэн бүтээгдэхүүн бүртгэгдээгүй байна.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
