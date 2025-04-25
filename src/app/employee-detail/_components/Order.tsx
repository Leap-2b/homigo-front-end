import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/lib/order/createOrder";
import { employeType, productsType, userType } from "@/types/user";
import React, { useState } from "react";
import { toast } from "sonner";

const Order = ({
  employee,
  currentUser,
}: {
  employee: employeType;
  currentUser: userType;
}) => {
  const [selectedProducts, setSelectedProducts] = useState<productsType[]>([]);
  const [information, setInformation] = useState<string>("");

  const handleSelect = (product: productsType) => {
    const alreadySelected = selectedProducts.find((p) => p._id === product._id);
    if (!alreadySelected) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const totalPrice = selectedProducts.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  const productIds = selectedProducts.map((product) => product._id);

  const orderHandler = () => {
    try {
      createOrder(
        currentUser.email,
        information,
        currentUser._id,
        productIds,
        employee._id,
        totalPrice
      );
      toast.success("амжилттай захиаллаа");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Бүх үйлчилгээ */}
      <div className="space-y-2">
        {employee.products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border p-2 rounded-lg"
          >
            <span>{product.name}</span>
            <div className="flex items-center gap-2">
              <span>{product.price}₮</span>
              <Button size="sm" onClick={() => handleSelect(product)}>
                Сонгох
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Сонгогдсон үйлчилгээ */}
      {selectedProducts.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold">Сонгогдсон үйлчилгээ:</h3>
          {selectedProducts.map((product) => (
            <div key={product._id} className="flex justify-between text-sm">
              <span>{product.name}</span>
              <span>{product.price}₮</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Нийт үнэ:</span>
            <span>{totalPrice}₮</span>
          </div>
        </div>
      )}

      <Textarea
        placeholder="Нэмэлт мэдээлэл"
        onChange={(e) => setInformation(e.target.value)}
      />

      <Button
        disabled={information === ""}
        onClick={orderHandler}
        className="w-full"
      >
        Захиалах
      </Button>
    </div>
  );
};

export default Order;
