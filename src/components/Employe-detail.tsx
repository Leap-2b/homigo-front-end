import { Heart, Image } from "lucide-react";
import { Card } from "./ui/card";

export default function EmployeDetail() {
  return (
    <section>
      <div className="flex justify-between items-center mb-6 w-[1800px]">
        <h2 className="text-2xl font-bold">Бүх мэргэжилтнүүд</h2>
        <span className="text-gray-500">6 мэргэжилтэн</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden border border-gray-200 w-90 h-90">
          <div className="relative h-48 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-400">
              <Image />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-medium">DSAD</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xl font-bold">dsd ₮/цаг</p>
                <p className="text-gray-700">sdasad</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-2">scfasdfasd</div>
          </div>
        </Card>
      </div>
    </section>
  );
}
