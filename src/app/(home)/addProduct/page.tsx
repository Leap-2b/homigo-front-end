"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEmployee } from "@/app/_context/EmployeContext";
import { toast } from "sonner";
import { addService } from "@/lib/service/add-service";
import { deleteService } from "@/lib/service/delete-service";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EmployeService = () => {
  const { handleRefresh, currentEmploye } = useEmployee();
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      if (currentEmploye) {
        setServices(currentEmploye.products);
      }
    } catch (error) {
      console.error("Үйлчилгээг татаж чадсангүй:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addHandler = async () => {
    if (!name || price <= 0) {
      toast.error("Нэр болон үнийг зөв оруулна уу.");
      return;
    }

    if (currentEmploye) {
      try {
        await addService(currentEmploye._id, name, price);
        setName("");
        setPrice(0);
        handleRefresh();
        fetchServices();
      } catch (error) {
        console.error("Нэмэх үед алдаа:", error);
        toast.error("Үйлчилгээ нэмэхэд алдаа гарлаа");
      }
    }
  };

  const deleteHandler = async (productId: string) => {
    if (!currentEmploye?._id) return;

    try {
      await deleteService(currentEmploye._id, productId);
      handleRefresh();
      fetchServices();
    } catch (error) {
      console.error("Устгах үед алдаа:", error);
      toast.error("Үйлчилгээ устгахад алдаа гарлаа");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Хүлээгдэж байна
          </Badge>
        );
      case "APPROVE":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Зөвшөөрсөн
          </Badge>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentEmploye]);

  return (
    <div className="lg:w-[84%] m-auto h-screen mt-15 rounded-lg shadow-lg flex flex-col gap-6">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Миний үйлчилгээнүүд:
          {currentEmploye?.category === "CLEANER" ? "Цэвэрлэгээ" : "Засвар"}
        </h2>
        <Button
          onClick={fetchServices}
          variant="outline"
          className="flex items-center gap-2 mt-2"
        >
          <RefreshCw className="h-4 w-4" />
          Шинэчлэх
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[50vh]">
        {isLoading ? (
          <div className="text-center text-gray-500">Татаж байна...</div>
        ) : (
          services.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border px-6 py-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">
                  {product.name}
                </span>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-50 rounded-md border overflow-hidden">
                  <Input
                    type="number"
                    value={product.price}
                    className="w-28 border-0 focus-visible:ring-0 text-right"
                    placeholder="Үнэ"
                    readOnly
                  />
                  <span className="px-2 text-gray-500 font-medium">₮</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteHandler(product._id)}
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4 bg-white">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input
            placeholder="Үйлчилгээний нэр"
            className="flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Үйлчилгээний үнэ"
            className="flex-1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Button size="sm" onClick={addHandler}>
            <Plus className="h-4 w-4 mr-1" />
            Нэмэх
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Хаах</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeService;
