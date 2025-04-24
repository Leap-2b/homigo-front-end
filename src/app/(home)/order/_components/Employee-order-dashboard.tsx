"use client";

import { useEffect, useState } from "react";
import { orderType } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw } from "lucide-react";
import { getOrders } from "@/lib/order/getOrder";
import { useEmployee } from "@/app/_context/EmployeContext";
import { Clock, Ban, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OrderTabs from "./OrderTabs";

const EmployeeOrderDashboard = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentEmploye } = useEmployee();

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      if (currentEmploye) {
        const data = await getOrders(currentEmploye?._id);
        setOrders(data);
      }
    } catch (error) {
      console.error("Захиалгыг татаж чадсангүй:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
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
            <Check className="h-5 w-5 text-green-500" />
            <Badge variant="outline" className="bg-blue-50 text-green-700">
              Зөвшөөрсөн
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
        >
          <RefreshCw className="h-4 w-4" />
          Шинэчлэх
        </Button>
      </div>

      <OrderTabs
        isLoading={isLoading}
        orders={orders}
        getStatusIcon={getStatusIcon}
        fetchOrders={fetchOrders}
      />
    </div>
  );
};

export default EmployeeOrderDashboard;
