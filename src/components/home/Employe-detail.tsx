"use client";
import { Heart } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
export default function EmployeDetail() {
  const { employees } = useEmployee();
  return (
    <section className="w-[80vw]">
      <div className="flex justify-between items-center mb-6 w-[80vw]">
        <h2 className="text-2xl font-bold">Бүх мэргэжилтнүүд</h2>
        <span className="font-bold">{employees?.length}</span>
      </div>
      <div className="flex gap-10 mb-10 flex-wrap">
        {employees?.map((employee) => {
          return (
            <Link href={`employee-detail/${employee._id}`} key={employee._id}>
              <Card className="overflow-hidden border  w-100 h-100 ">
                <div className="relative w-full h-full bg-gray-100">
                  <Image
                    src={employee.img}

                    alt="zurag"
                    fill
                    className="object-contain object-center"
                    priority

                  />
                  <div className="absolute bottom-0 left-0 right-0  to-transparent p-4">
                    <h3 className="text-black font-medium mb-4">{employee.category}</h3> {/* доош зайтай болгох */}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xl font-bold">тохиролцоно/үнэ</p>
                      <p className="font-bold">{employee.firstName}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
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
