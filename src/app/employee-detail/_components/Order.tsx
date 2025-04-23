import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { employeType } from "@/types/user";
import React from "react";

const Order = ({ employee }: { employee: employeType }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-2">
        {employee.products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border p-2 rounded-lg"
          >
            <span>{product.name}</span>
            <div className="flex items-center gap-2">
              <span>{product.price}₮</span>
              <Button size="sm">Сонгох</Button>
            </div>
          </div>
        ))}
      </div>

      <Textarea placeholder="Нэмэлт мэдээлэл" />

      <Button className="w-full">Захиалах</Button>
    </div>
  );
};

export default Order;
