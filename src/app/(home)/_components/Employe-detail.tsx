"use client";
import Link from "next/link";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
import { Heart, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
export default function EmployeDetail() {
  const { employees } = useEmployee();
  console.log(employees);
  return (
    <div className="flex flex-col gap-15">
      <section className="w-[80vw]">
        <div className="flex justify-between items-center mb-6 w-[80vw]">
          <h2 className="text-2xl font-bold">Бүх мэргэжилтнүүд</h2>
          <span className="font-bold">{employees?.length}</span>
        </div>
        <div className="flex gap-10 mb-10 flex-wrap">
          {employees?.map((employee) => {
            return (
              <Link
                href={`employee-detail/${employee._id}`}
                key={employee._id}
                className="w-full"
              >
                <div className="w-full flex flex-col gap-7 border border-solid border-gray-300 rounded-lg bg-white p-5">
                  <div className="flex gap-5">
                    <div className="relative w-30 h-28 border-1 border-gray-500 border-solid rounded-full">
                      <Image
                        src={employee.img}
                        alt="zurag"
                        fill
                        className="object-cover rounded-full"
                        priority
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2 items-center">
                          <p className="font-bold">
                            {employee.lastName.charAt(0)}. {employee.firstName}
                          </p>
                          <div className="h-5 w-[2px] bg-gray-300"></div>
                          <div className="py-1 px-2 rounded-lg bg-green-300 text-[12px]">
                            <p>баталгаатай ажилтан</p>
                          </div>
                          <div className="h-5 w-[2px] bg-gray-300"></div>
                          <div className="flex gap-2 items-center ">
                            <Star />
                            <p className="font-bold">4.9</p>
                            <p className="text-gray-500">(10)</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="border border-solid border-gray-500 rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full  cursor-pointer"
                            >
                              <Heart />
                            </Button>
                          </div>
                          <div className="border border-solid border-gray-500 rounded-lg p-2 font-bold flex justify-center items-center cursor-pointer hover:bg-gray-100">
                            <button className="cursor-pointer">
                              See Profile
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="font-medium text-gray-500">
                          {employee.address}
                        </p>
                        <p>{employee.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <div className="flex gap-3 ">
                    {employee.products.slice(0, 5).map((product) => {
                      return (
                        <div
                          key={product._id}
                          className="p-2 border border-solid border-gray-300 rounded-full"
                        >
                          <p className=" text-gray-700">{product.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
