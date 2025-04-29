"use client";
import Link from "next/link";
import Image from "next/image";
import { useEmployee } from "@/app/_context/EmployeContext";
import { Heart, ListOrdered, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { employeType } from "@/types/user";

interface ProductType {
  _id: string;
  name: string;
}

export default function EmployeDetail({
  filteredEmployees,
}: {
  filteredEmployees?: employeType[];
}) {
  const { employees } = useEmployee();
  const getEmployeeCount = () => {
    if (filteredEmployees && filteredEmployees.length > 0) {
      return filteredEmployees.length;
    }
    return employees?.length ?? 0;
  };
  console.log(filteredEmployees);
  return (
    <div className="flex flex-col gap-15">
      <section className="w-full px-4 md:px-0 md:w-[80vw]">
        <div className="flex justify-between items-center mb-6 w-full md:w-[80vw]">
          <h2 className="text-xl md:text-2xl font-bold">
            {filteredEmployees == undefined
              ? "Бүх мэргэжилтнүүд"
              : "Сонгосон мэргэжилтнүүд"}
          </h2>
          <span className="font-bold text-[20px] flex gap-2 items-center">
            <ListOrdered />
            {getEmployeeCount()}
          </span>
        </div>
        <div className="flex gap-5 md:gap-10 mb-10 flex-wrap">
          {!filteredEmployees || filteredEmployees.length === 0 ? (
            <>
              {employees?.map((employee) => (
                <Link
                  href={`employee-detail/${employee._id}`}
                  key={employee._id}
                  className="w-full"
                >
                  <div className="w-full flex flex-col gap-4 md:gap-7 border border-solid border-gray-300 rounded-lg bg-white p-3 md:p-5">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
                      <div className="relative w-24 h-24 md:w-30 md:h-28 mx-auto sm:mx-0 border-1 border-gray-500 border-solid rounded-full">
                        <Image
                          src={employee.img}
                          alt="zurag"
                          fill
                          className="object-cover rounded-full"
                          priority
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                          <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center">
                            <p className="font-bold">
                              {employee.lastName?.charAt(0)}.{" "}
                              {employee.firstName}
                            </p>
                            <div className="h-5 w-[2px] bg-gray-300 hidden sm:block"></div>
                            <div className="py-1 px-2 rounded-lg bg-green-300 text-[12px]">
                              <p>баталгаатай ажилтан</p>
                            </div>
                            <div className="h-5 w-[2px] bg-gray-300 hidden sm:block"></div>
                            <div className="flex gap-2 items-center">
                              <Star />
                              <p className="font-bold">4.9</p>
                              <p className="text-gray-500">(10)</p>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-center sm:justify-start mt-3 sm:mt-0">
                            <div className="border border-solid border-gray-500 rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full cursor-pointer"
                              >
                                <Heart />
                              </Button>
                            </div>
                            <div className="border border-solid border-gray-500 rounded-lg p-2 font-bold flex justify-center items-center cursor-pointer hover:bg-gray-100">
                              <button className="cursor-pointer">
                                Дэлгэрэнгүй үзэх
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-3 sm:mt-2">
                          <p className="font-medium text-gray-500 text-center sm:text-left">
                            {employee.address}
                          </p>
                          <p className="text-center sm:text-left">
                            {employee.about}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                      {Array.isArray(employee.products) &&
                      employee.products.length > 0 ? (
                        employee.products
                          .slice(0, 5)
                          .map((product: ProductType) => (
                            <div
                              key={product._id}
                              className="p-2 border border-solid border-gray-300 rounded-full"
                            >
                              <p className="text-gray-700 text-sm md:text-base">
                                {product.name}
                              </p>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">Бүтээгдэхүүн байхгүй</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <>
              {filteredEmployees.map((employee) => (
                <Link
                  href={`employee-detail/${employee._id}`}
                  key={employee._id}
                  className="w-full"
                >
                  <div className="w-full flex flex-col gap-4 md:gap-7 border border-solid border-gray-300 rounded-lg bg-white p-3 md:p-5">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
                      <div className="relative w-24 h-24 md:w-30 md:h-28 mx-auto sm:mx-0 border-1 border-gray-500 border-solid rounded-full">
                        <Image
                          src={employee.img}
                          alt="zurag"
                          fill
                          className="object-cover rounded-full"
                          priority
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                          <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center">
                            <p className="font-bold">
                              {employee.lastName?.charAt(0)}.{" "}
                              {employee.firstName}
                            </p>
                            <div className="h-5 w-[2px] bg-gray-300 hidden sm:block"></div>
                            <div className="py-1 px-2 rounded-lg bg-green-300 text-[12px]">
                              <p>баталгаатай ажилтан</p>
                            </div>
                            <div className="h-5 w-[2px] bg-gray-300 hidden sm:block"></div>
                            <div className="flex gap-2 items-center">
                              <Star />
                              <p className="font-bold">4.9</p>
                              <p className="text-gray-500">(10)</p>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-center sm:justify-start mt-3 sm:mt-0">
                            <div className="border border-solid border-gray-500 rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full cursor-pointer"
                              >
                                <Heart />
                              </Button>
                            </div>
                            <div className="border border-solid border-gray-500 rounded-lg p-2 font-bold flex justify-center items-center cursor-pointer hover:bg-gray-100">
                              <button className="cursor-pointer">
                                Дэлгэрэнгүй үзэх
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 mt-3 sm:mt-2">
                          <p className="font-medium text-gray-500 text-center sm:text-left">
                            {employee.address}
                          </p>
                          <p className="text-center sm:text-left">
                            {employee.about}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                      {Array.isArray(employee.products) &&
                      employee.products.length > 0 ? (
                        employee.products
                          .slice(0, 5)
                          .map((product: ProductType) => (
                            <div
                              key={product._id}
                              className="p-2 border border-solid border-gray-300 rounded-full"
                            >
                              <p className="text-gray-700 text-sm md:text-base">
                                {product.name}
                              </p>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">Бүтээгдэхүүн байхгүй</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
