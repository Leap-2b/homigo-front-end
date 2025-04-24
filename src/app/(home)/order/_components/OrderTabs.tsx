import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { orderType } from "@/types/user";
import { Check, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/lib/order/update-orderStatus";
import { toast } from "sonner";
type Props = {
  isLoading: boolean;
  orders: orderType[];
  getStatusIcon: (status: string) => React.ReactElement | null;
  fetchOrders: () => void;
};

const OrderTabs = ({
  isLoading,
  orders,
  getStatusIcon,
  fetchOrders,
}: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<orderType | null>(null);
  const [dialogStatus, setDialogStatus] = useState<string>("ALL");

  const openDialog = (order: orderType) => {
    setSelectedOrder(order);
    setDialogStatus(order.orderStatus);
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedOrder) return;
    const updated = await updateOrderStatus(selectedOrder._id, status);
    toast.success("Амжилттай солигдлоо");
    fetchOrders();
    setSelectedOrder(null);
    setSelectedOrder((prev) =>
      prev && prev._id === updated._id
        ? { ...prev, orderStatus: updated.orderStatus }
        : prev
    );
  };

  const renderOrderCard = (order: orderType, index: number) => (
    <section
      key={order._id}
      className="border rounded-lg p-4 shadow-sm space-y-3 cursor-pointer hover:bg-gray-50 transition"
      onClick={() => openDialog(order)}
    >
      <header className="flex justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-lg font-bold">
            <span>Захиалга №{index + 1}</span>
            {getStatusIcon(order.orderStatus)}
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
          {order.productId.map((product) => (
            <span key={product._id}>{product.name},</span>
          ))}
        </div>
      </div>
    </section>
  );

  const renderOrders = (status: string) =>
    orders
      .filter((order) => order.orderStatus === status)
      .map((order, index) => renderOrderCard(order, index));

  if (isLoading) return <p>Уншиж байна...</p>;
  if (orders.length === 0) return <p>Захиалга олдсонгүй</p>;

  return (
    <>
      <Tabs value={dialogStatus} onValueChange={setDialogStatus}>
        <TabsList className="space-x-4">
          <TabsTrigger value="ALL">Бүгд</TabsTrigger>
          <TabsTrigger value="PENDING">Хүлээгдэж байна</TabsTrigger>
          <TabsTrigger value="CANCEL">Цуцалсан</TabsTrigger>
          <TabsTrigger value="CHANGE">Өөрчлөлт хүсэх</TabsTrigger>
          <TabsTrigger value="APPROVE">Зөвшөөрсөн</TabsTrigger>
        </TabsList>
        <TabsContent value="ALL" className="space-y-4">
          {orders.map((order, index) => renderOrderCard(order, index))}
        </TabsContent>
        <TabsContent value="PENDING" className="space-y-4">
          {renderOrders("PENDING")}
        </TabsContent>

        <TabsContent value="CANCEL" className="space-y-4">
          {renderOrders("CANCEL")}
        </TabsContent>

        <TabsContent value="CHANGE" className="space-y-4">
          {renderOrders("CHANGE")}
        </TabsContent>

        <TabsContent value="APPROVE" className="space-y-4">
          {renderOrders("APPROVE")}
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Захиалгын дэлгэрэнгүй</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                  <X
                    onClick={() => setSelectedOrder(null)}
                    className="h-6 w-6"
                  />
                </button>

                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Захиалгын дэлгэрэнгүй</h2>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Захиалга</p>
                </div>

                <div className="mb-6 rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-3 font-semibold">Сонгосон үйлчилгээнүүд</h3>
                  <div className="space-y-2">
                    {selectedOrder.productId.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between"
                      >
                        <span>{product.name}</span>
                        <span className="font-medium">
                          {product.price.toLocaleString()}₮
                        </span>
                      </div>
                    ))}
                    <div className="mt-2 border-t border-gray-200 pt-2">
                      <div className="flex items-center justify-between font-bold">
                        <span>Нийт үнэ:</span>
                        <span>
                          {selectedOrder.totalPrice.toLocaleString()}₮
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.request && (
                  <div className="mb-6 rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-2 font-semibold">
                      Хэрэглэгчийн тайлбар:
                    </h3>
                    <p className="text-gray-700">{selectedOrder.request}</p>
                  </div>
                )}

                <Button
                  className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  onClick={() => selectedOrder && handleStatusChange("APPROVE")}
                  disabled={selectedOrder?.orderStatus === "APPROVE"}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Зөвшөөрөх
                </Button>

                <Button
                  className="flex-1 bg-red-600 text-white hover:bg-red-700"
                  onClick={() => selectedOrder && handleStatusChange("CANCEL")}
                  disabled={selectedOrder?.orderStatus === "CANCEL"}
                >
                  <X className="mr-2 h-4 w-4" />
                  Цуцлах
                </Button>

                <Button
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => selectedOrder && handleStatusChange("CHANGE")}
                  disabled={selectedOrder?.orderStatus === "CHANGE"}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Өөрчлөлт хүсэх
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderTabs;
