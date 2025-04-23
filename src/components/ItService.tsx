"use client";

import { Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmployee } from "@/app/_context/EmployeContext";

export default function ItService() {
  const { employees } = useEmployee();
  const { currentEmploye } = useEmployee();

  const EmployeeProduct = employees?.find(
    (employee) => employee._id === currentEmploye?._id
  );
  console.log(EmployeeProduct);
  return (
    <div className="w-full max-w-md mx-auto rounded-lg shadow-lg flex flex-col gap-6">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-center">
          Миний үйлчилгээнүүд:{" "}
          {EmployeeProduct?.category === "CLEANER" ? "Цэвэрлэгээ" : "Засвар"}
        </h2>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[50vh]">
        {EmployeeProduct?.products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border p-3 rounded-lg bg-white shadow-sm"
          >
            <span className="font-medium text-gray-800">{product?.name}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-50 rounded-md border overflow-hidden">
                <Input
                  type="number"
                  value={product?.price}
                  className="w-28 border-0 focus-visible:ring-0 text-right"
                  placeholder="Үнэ"
                  readOnly
                />
                <span className="px-2 text-gray-500 font-medium">₮</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="border-t p-4 bg-white">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Шинэ үйлчилгээний нэр"
            className="flex-1"
            readOnly
          />
          <Button size="sm">
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
}
