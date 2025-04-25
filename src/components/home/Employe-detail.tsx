"use client";
import Link from "next/link";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";

export default function EmployeDetail() {
  const { employees } = useEmployee();

  return (
    <section className="w-full px-4 sm:px-10 md:w-[80vw]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Бүх мэргэжилтнүүд</h2>
        <span className="font-bold text-sm sm:text-base">
          {employees?.length}
        </span>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        {employees?.map((employee) => (
          <Link
            href={`employee-detail/${employee._id}`}
            key={employee._id}
            className="w-full"
          >
            <div className="w-full flex flex-col gap-5 border border-solid border-gray-300 rounded-lg bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-gray-300 rounded-full mx-auto sm:mx-0">
                  <Image
                    src={employee.img}
                    alt="zurag"
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex flex-wrap gap-2 items-center">
                      <p className="font-bold">
                        {employee.lastName.charAt(0)}. {employee.firstName}
                      </p>
                      <div className="hidden sm:block h-5 w-[2px] bg-gray-300"></div>
                      <div className="py-1 px-2 rounded-lg bg-green-300 text-xs">
                        <p>баталгаатай ажилтан</p>
                      </div>
                      <div className="hidden sm:block h-5 w-[2px] bg-gray-300"></div>
                      <div className="flex gap-1 items-center text-sm">
                        <Star className="w-4 h-4" />
                        <p className="font-bold">4.9</p>
                        <p className="text-gray-500">(10)</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full border border-gray-500"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <button className="border border-gray-500 rounded-lg px-3 py-1 text-sm font-semibold hover:bg-gray-100">
                        See Profile
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-sm">
                    <p className="text-gray-500">{employee.address}</p>
                    <p>{employee.about}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-300"></div>

              <div className="flex flex-wrap gap-2">
                {employee.products.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="px-3 py-1 border border-solid border-gray-300 rounded-full text-sm text-gray-700"
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
