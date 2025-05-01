import { employeType, productsType } from "@/types/user";
import React from "react";

const AboutTabs = ({ employee }: { employee: employeType }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Миний тухай</h2>
        <p className="text-gray-700 whitespace-pre-line">{employee?.about}</p>
      </div>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Үйлчилгээнүүд</h2>
        <div className="flex flex-col gap-3">
          {employee.products && employee.products.length > 0 ? (
            employee.products.map((product: productsType) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border shadow-sm p-6"
              >
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Үнэ:</span>
                    <span className="font-bold">{product.price}₮</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 p-6 border border-dashed rounded-lg">
              Одоогоор ямар нэгэн бүтээгдэхүүн бүртгэгдээгүй байна.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;
