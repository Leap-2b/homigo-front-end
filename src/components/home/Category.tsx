import React from "react";
import CardSlider from "./cards";
import EmployeDetail from "./Employe-detail";
const Category = () => {
  return (
    <div className="w-full m-auto flex flex-col items-center  bg-gray-100">
      <div className="  items-center px-4 py-3 flex ">
        <CardSlider />
      </div>
      <EmployeDetail />
    </div>
  );
};

export default Category;
