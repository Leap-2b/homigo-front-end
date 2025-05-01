import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { orderType } from "@/types/user";
import { Check, RefreshCw, Star, X } from "lucide-react";
import Image from "next/image";
import { createRating } from "@/lib/rating/newRating";
import { Textarea } from "@/components/ui/textarea";

const SelectedOrderButton = ({
  selectedOrder,
  handleStatusChange,
  id,
  loading,
}: {
  selectedOrder: orderType;
  handleStatusChange: (status: string) => void;
  id: string;
  loading: boolean;
}) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRatingDialogOpen, setRatingDialogOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const openConfirmationDialog = () => setConfirmationDialogOpen(true);
  const closeConfirmationDialog = () => setConfirmationDialogOpen(false);
  const openRatingDialog = () => setRatingDialogOpen(true);
  const closeRatingDialog = () => setRatingDialogOpen(false);

  const confirmPayment = () => {
    closeConfirmationDialog();

    openRatingDialog();
  };

  const handleRatingSubmit = async () => {
    handleStatusChange("DONE");
    if (rating === 0 || !selectedOrder?._id) return;

    setIsSubmitting(true);
    await createRating(rating, id, comments);
    closeRatingDialog();
    setIsSubmitting(false);
  };

  return (
    <>
      {selectedOrder.orderStatus == "DONE" ? (
        ""
      ) : (
        <>
          <div className="flex gap-3">
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
                  disabled={loading}
                >
                  <X className="mr-1 h-3 w-3" />
                  {loading ? "Уншиж байна..." : " Цуцлах"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="flex-1 bg-orange-600 text-white hover:bg-orange-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("APPROVE")}
                  disabled={selectedOrder?.orderStatus === "APPROVE" || loading}
                >
                  <Check className="mr-1 h-3 w-3" />
                  {loading ? "Уншиж байна..." : "Зөвшөөрөх"}
                </Button>

                <Button
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 py-1 px-2 text-sm"
                  onClick={() => selectedOrder && handleStatusChange("CANCEL")}
                  disabled={selectedOrder?.orderStatus === "CANCEL"}
                >
                  <X className="mr-1 h-3 w-3" />
                  {loading ? "Уншиж байна..." : " Цуцлах"}
                </Button>
              </>
            )}
          </div>
        </>
      )}

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Үйлчилгээний үнэлгээ</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <p className="mb-4 text-center">Үйлчилгээний чанарыг үнэлнэ үү</p>
            <div className="flex space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`h-10 w-10 ${
                      (hoveredRating ? hoveredRating >= star : rating >= star)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Сэтгэгдэл"
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-400 text-white hover:bg-gray-500"
              onClick={closeRatingDialog}
            >
              Хаах
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleRatingSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? "Илгээж байна..." : "Илгээх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                disabled={loading}
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
