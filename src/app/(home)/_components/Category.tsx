"use client";
import React, { useState } from "react";
import CardSlider from "./cards";
import EmployeDetail from "./Employe-detail";
import { useEmployee } from "@/app/_context/EmployeContext";
import { employeType } from "@/types/user";

const Category = () => {
  const { employees } = useEmployee();
  const [filteredEmployees, setFilteredEmployees] = useState<employeType[]>();

  const handleFilter = (category: string) => {
    setFilteredEmployees(employees?.filter((emp) => emp.category === category));
  };

  return (
    <div className="w-full m-auto flex flex-col items-center  bg-gray-100 ">
      <div className="w-full px-4 py-3 md:flex md:w-[80vw]">
        <CardSlider handleFilter={handleFilter} />
      </div>
      <EmployeDetail filteredEmployees={filteredEmployees} />
    </div>
  );
};

export default Category;
