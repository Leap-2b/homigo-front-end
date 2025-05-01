import { Button } from "@/components/ui/button";
import { Calendar, Handshake, Heart, MapPin, Share2, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Order from "./Order";

import { employeType, userType } from "@/types/user";
import { useUser } from "@/app/_context/UserContext";

interface EmployeDetailProfileProps {
  employee: employeType;
  likeHandler: () => void;
  isLiked: boolean;
  currentUser: userType | null;
  id: string;
}

const EmployeDetailProfile = ({
  employee,
  likeHandler,
  isLiked,
  currentUser,
  id,
}: EmployeDetailProfileProps) => {
  const { ratings } = useUser();

  const filteredRating = ratings.filter((rating) => rating.employeId === id);

  const averageRating =
    filteredRating.length > 0
      ? filteredRating.reduce((sum, rating) => sum + rating.rating, 0) /
        filteredRating.length
      : 0;

  return (
    <div className="bg-white border-b">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
              <Image
                src={employee?.img || "/placeholder.svg"}
                alt="Employee profile"
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
                            i < Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {averageRating.toFixed(1)} ({filteredRating.length}
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
                    <span className="text-lg font-bold">
                      {filteredRating.length}
                    </span>
                    <span className="text-sm text-gray-600">Дууссан ажил</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg font-bold">1 цагийн дотор</span>
                    <span className="text-sm text-gray-600">
                      Хариу өгөх хугацаа
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg font-bold">тохиролцоно</span>
                    <span className="text-sm text-gray-600">Үнийн санал</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    {currentUser ? (
                      <Button className="w-full md:w-auto">
                        <Handshake className="w-5 h-5 " />
                        Захиалах
                      </Button>
                    ) : null}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Захиалга</DialogTitle>
                    {currentUser && (
                      <Order employee={employee} currentUser={currentUser} />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeDetailProfile;
