import Image from "next/image";
import React from "react";
const fakeArray = [
  {
    name: "Cleaner",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_a…74-1735211873046/Icons_Programming%20_%20Tech.png",
  },
  {
    name: "IT",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_a…74-1735211873046/Icons_Programming%20_%20Tech.png",
  },
];
const Category = () => {
  return (
    <div className="w-full">
      <div className="w-[90%] bg-blue-50 m-auto  items-center px-4 py-3 flex ">
        <div className="flex flex-col gap-6">
          <h3 className="text-5xl text-black">Explore categories</h3>
          <div className="flex gap-3.5">
            {fakeArray.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
