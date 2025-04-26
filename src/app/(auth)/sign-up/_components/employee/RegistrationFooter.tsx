import React from "react";
import { motion } from "framer-motion";
import { Shield, User, CheckCircle } from "lucide-react";

export const RegistrationFooter = () => {
  return (
    <motion.div
      className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex items-center gap-1">
        <Shield size={16} className="text-[#2672e4]" />
        <span>Secure registration</span>
      </div>
      <div className="flex items-center gap-1">
        <User size={16} className="text-[#2672e4]" />
        <span>Join 10,000+ users</span>
      </div>
      <div className="flex items-center gap-1">
        <CheckCircle size={16} className="text-[#2672e4]" />
        <span>Free to join</span>
      </div>
    </motion.div>
  );
};
