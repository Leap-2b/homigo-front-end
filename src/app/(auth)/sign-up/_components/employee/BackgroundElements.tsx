import React from "react";
import { motion } from "framer-motion";
import { Building2, Home, MapPin } from "lucide-react";

export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-50 blur-3xl opacity-70"></div>
      <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-teal-50 blur-3xl opacity-60"></div>

      <motion.div
        className="absolute top-[15%] left-[15%]"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Home className="text-green-200 w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[20%]"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Building2 className="text-emerald-200 w-14 h-14" />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[15%]"
        animate={{
          y: [0, 8, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <MapPin className="text-teal-200 w-12 h-12" />
      </motion.div>
    </div>
  );
};
