"use client";
import { useUser } from "@/app/_context/UserContext";
import { Badge } from "@/components/ui/badge";
import { ClientGetOrder } from "@/lib/order/clientGetOrder";
import { orderType } from "@/types/user";
import { Ban, Check, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const { currentUser } = useUser();

  const handleFetchOrders = async () => {
    if (!currentUser) return;
    const data = await ClientGetOrder(currentUser._id);
    setOrders(data);
  };

  useEffect(() => {
    if (currentUser) {
      handleFetchOrders();
    }
  }, [currentUser]);

  // Төлөвийг буцаадаг функц
  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Хүлээгдэж байна
            </Badge>
          </div>
        );
      case "CANCEL":
        return (
          <div className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-red-500" />
            <Badge variant="outline" className="bg-red-50 text-red-700">
              Цуцалсан
            </Badge>
          </div>
        );
      case "APPROVE":
        return (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-[#2672e4]" />
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Зөвшөөрсөн
            </Badge>
          </div>
        );
      case "DONE":
        return (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Дууссан
            </Badge>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gray-50 text-gray-700">
              Тодорхойгүй
            </Badge>
          </div>
        );
    }
  };
  const lastFiveOrders = [...orders].reverse().slice(0, 5);
  return (
    <div className="w-[50vw] min-h-[50vh] flex flex-col m-auto mt-10 gap-5">
      {lastFiveOrders.map((order, index) => {
        return (
          <section
            key={order._id}
            className="w-full border rounded-lg p-4 shadow-sm space-y-3 cursor-pointer hover:bg-gray-50 transition"
          >
            <header className="flex justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-bold">
                  <span>Захиалга № {index + 1}</span>
                  {/* Энд зөв шууд гаргана */}
                  {getOrderStatusLabel(order.orderStatus)}
                </div>
                <p className="text-sm font-semibold">
                  Хэрэглэгчийн тайлбар: {order.request}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold">Нийт үнэ</p>
                <p className="text-xl font-bold">
                  {order.totalPrice.toLocaleString()}₮
                </p>
              </div>
            </header>

            <hr className="border-gray-200" />

            <div className="text-sm text-gray-500 flex gap-2">
              <span>Үйлчилгээ:</span>
              <div className="flex flex-wrap gap-2">
                {order?.productId?.map((product) => (
                  <span key={product._id}>{product.name},</span>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Page;
