"use client";
import { useUser } from "@/app/_context/UserContext";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

const ReviewsTabs = ({ id }: { id: string }) => {
  const { ratings } = useUser();

  const filteredRating = ratings.filter((rating) => rating.employeId == id);

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
      </div>
    );
  };

  if (!ratings.length) return <div>No reviews yet</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">
        Сэтгэгдэл үлдээсэн хэрэглэгчид ({ratings.length})
      </h2>
      {filteredRating.map((review) => (
        
        <div
          key={review._id}
          className="p-6 border rounded-lg shadow-sm bg-card"
        >
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={`https://github.com/shadcn.png`}
                alt="User"
                className="rounded-full w-[40px] h-[40px]"
              />
              <AvatarFallback>Хэрэглэгч</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="font-medium">Хэрэглэгч</h3>
                {renderRating(review.rating)}
              </div>
              <p className="text-sm text-card-foreground">{review.comments}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTabs;
