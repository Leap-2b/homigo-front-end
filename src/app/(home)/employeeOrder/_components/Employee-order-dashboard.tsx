"use client";

import { useEffect, useState } from "react";
import { orderType } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, Clock, Ban, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEmployee } from "@/app/_context/EmployeContext";
import OrderTabs from "./OrderTabs";

const EmployeeOrderDashboard = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentEmploye, fetchOrders } = useEmployee();

  const handleFetchOrders = async () => {
    setIsLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentEmploye) {
      handleFetchOrders();
    }
  }, [currentEmploye]);

  const getStatusIcon = (status: string) => {
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
      case "CHANGE":
        return (
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5 text-blue-500" />
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Өөрчлөлт хүссэн
            </Badge>
          </div>
        );
      case "APPROVE":
        return (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-[#2672e4]" />
            <Badge variant="outline" className="bg-blue-50 text-green-700">
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
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Захиалгын жагсаалт</h2>
        <Button
          onClick={fetchOrders}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isLoading} // Loading үед товчийг идэвхгүй болгоно.
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Шинэчлэх
        </Button>
      </div>

      <OrderTabs
        isLoading={isLoading}
        orders={orders}
        getStatusIcon={getStatusIcon}
        fetchOrders={handleFetchOrders}
      />
    </div>
  );
};

export default EmployeeOrderDashboard;
