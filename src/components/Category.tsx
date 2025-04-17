import React from "react";
import CardSlider from "./cards";
const Category = () => {
  return (
    <div className="w-full m-auto flex flex-col items-center  bg-gray-100">
      <div className="  items-center px-4 py-3 flex ">
        <div className="flex flex-col gap-6">
          {/* <h3 className="text-5xl text-black">Explore categories</h3> */}
        </div>
        <CardSlider />
      </div>
    </div>
  );
};

export default Category;
