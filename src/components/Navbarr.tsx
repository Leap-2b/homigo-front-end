import Image from "next/image";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="relative  w-full h-[400px] md:h-[500px]">
      <div className="absolute inset-0 bg-blue-200 z-10">fdsfdsa</div>
      <Image
        src="/placeholder.svg?height=500&width=1920"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative  z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Homi GO
        </h1>
        <p className="text-white text-lg mb-8 max-w-2xl">Та дууд Бид Тусаля</p>

        {/* Search Bar */}
        <div className="w-full max-w-xl flex">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Hangi hizmeti arıyorsun?"
              className="w-full px-4 py-3 rounded-l-md focus:outline-none"
            />
          </div>
          <Button className="bg-green-500 text-white px-6 py-3 rounded-r-md hover:bg-green-600 transition-colors">
            uasdasd
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
