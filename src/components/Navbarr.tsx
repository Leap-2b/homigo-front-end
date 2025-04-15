
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <div className="relative bg-blue-200  w-full h-[400px] md:h-[500px]">
      <div className="relative  z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Homi GO
        </h1>
        <p className="text-white text-lg mb-8 max-w-2xl">Та дууд Бид Тусаля</p>

        {/* Search Bar */}
        <div className="w-full gap-3 max-w-xl flex">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search Category"
              className="w-full px-4 py-3 rounded-l-md focus:outline-none"
            />
          </div>
          <Button className="bg-green-500 text-white px-6 py-3 rounded-r-md hover:bg-green-600 transition-colors">
            Click
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
