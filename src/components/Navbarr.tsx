"use client"

import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NavBar = () => {
  const [currentImage, setCurrentImage] = useState('/zurag.png');
  const timerRef = useRef(null);

  const startSlideTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImage(prev => 
        prev === '/zurag.png' ? '/zurag2.png' : '/zurag.png'
      );
    }, 5000);
  };
  
  useEffect(() => {
    startSlideTimer();
    
    return () => clearInterval(timerRef.current);
  }, []);

  const nextSlide = () => {
    setCurrentImage(prev => prev === '/zurag.png' ? '/zurag2.png' : '/zurag.png');
    startSlideTimer(); // Reset timer when manually changing slides
  };

  const prevSlide = () => {
    setCurrentImage(prev => prev === '/zurag.png' ? '/zurag2.png' : '/zurag.png');
    startSlideTimer(); // Reset timer when manually changing slides
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px]"
      style={{
        backgroundImage: `url('${currentImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        transition: "background-image 1s ease-in-out"
      }}
    >
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center text-center pt-[80px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Homi GO
        </h1>
        <p className="text-white text-lg mb-8 max-w-2xl">Та дууд, Бид тусалъя!</p>

        <div className="w-full gap-3 max-w-xl flex">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Ангилал хайх"
              className="w-full px-4 py-3 rounded-l-md focus:outline-none"
            />
          </div>
          <Button className="bg-[#3c87f7] text-white px-6 py-3 rounded-r-md hover:bg-[#2672e4] transition-colors">
            Энд дарна уу
          </Button>
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-30"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        <button
          onClick={() => {
            setCurrentImage('/zurag.png');
            startSlideTimer();
          }}
          className={`w-3 h-3 rounded-full ${
            currentImage === '/zurag.png' ? "bg-white" : "bg-white/50"
          }`}
          aria-label="First slide"
        />
        <button
          onClick={() => {
            setCurrentImage('/zurag2.png');
            startSlideTimer();
          }}
          className={`w-3 h-3 rounded-full ${
            currentImage === '/zurag2.png' ? "bg-white" : "bg-white/50"
          }`}
          aria-label="Second slide"
        />
      </div>
    </div>
  );
};

export default NavBar;