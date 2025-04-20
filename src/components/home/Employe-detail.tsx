import { Heart } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import { fetchAllEmployees } from "@/lib/get-all-category";
import { employeType } from "@/types/user";
import Image from "next/image";

export default async function EmployeDetail() {
  const data: employeType[] | undefined = await fetchAllEmployees();

  return (
    <section>
      <div className="flex justify-between items-center mb-6 w-[80vw]">
        <h2 className="text-2xl font-bold">Бүх мэргэжилтнүүд</h2>
        <span className="font-bold">{data?.EmployWithProducts.length}</span>
      </div>

      <div className="flex gap-10 mb-10 flex-wrap">
        {data?.EmployWithProducts.map((employee) => {
          return (
            <Link href={`employee-detail/${employee._id}`} key={employee._id}>
              <Card className="overflow-hidden border border-gray-200 w-90 h-90">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <Image
                      src={employee.img}
                      alt="zurag"
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-medium">
                      {employee.category}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xl font-bold">тохиролцоно/үнэ</p>
                      <p className="font-bold">{employee.firstName}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 ">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 font-bold">
                    {employee.experience} | УБ
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
