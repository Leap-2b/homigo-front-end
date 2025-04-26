import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { orderType } from "@/types/user";
import { Check, RefreshCw, X } from "lucide-react";
import Image from "next/image";

const SelectedOrderButton = ({
  selectedOrder,
  handleStatusChange,
}: {
  selectedOrder: orderType;
  handleStatusChange: (status: string) => void;
}) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const openConfirmationDialog = () => setConfirmationDialogOpen(true);
  const closeConfirmationDialog = () => setConfirmationDialogOpen(false);

  const confirmPayment = () => {
    handleStatusChange("DONE");
    closeConfirmationDialog();
  };

  return (
    <>
      {selectedOrder.orderStatus == "DONE" ? (
        ""
      ) : (
        <>
          <div>
            {selectedOrder?.orderStatus === "APPROVE" ? (
              <>
                <Button
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 py-1 px-2 text-sm"
                  onClick={openConfirmationDialog}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Амжилттай
                </Button>

                <Button
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("CANCEL")}
                >
                  <X className="mr-1 h-3 w-3" />
                  Цуцлах
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="flex-1 bg-orange-600 text-white hover:bg-orange-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("APPROVE")}
                  disabled={selectedOrder?.orderStatus === "APPROVE"}
                >
                  <Check className="mr-1 h-3 w-3" />
                  Зөвшөөрөх
                </Button>

                <Button
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("CANCEL")}
                  disabled={selectedOrder?.orderStatus === "CANCEL"}
                >
                  <X className="mr-1 h-3 w-3" />
                  Цуцлах
                </Button>

                <Button
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("CHANGE")}
                  disabled={selectedOrder?.orderStatus === "CHANGE"}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Өөрчлөлт хүсэх
                </Button>

                <Button
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("DONE")}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Амжилттай
                </Button>
              </>
            )}
          </div>
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onOpenChange={closeConfirmationDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Төлбөр төлөх</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Image src="/qr.png" width={350} height={350} alt="qr" />
            <div className="flex justify-between w-full">
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={closeConfirmationDialog}
              >
                Буцах
              </Button>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={confirmPayment}
              >
                Төлбөр төлсөн
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectedOrderButton;
