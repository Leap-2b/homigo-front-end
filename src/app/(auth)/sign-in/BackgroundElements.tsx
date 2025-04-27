import { motion } from "framer-motion";
import { Home, Building2, MapPin } from "lucide-react";

export default function BackgroundElements() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-teal-50 blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60"></div>
      </div>

      {/* Decorative icons */}
      <motion.div
        className="absolute left-[10%] top-[15%] text-[#3c87f7] opacity-20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Home size={48} />
      </motion.div>
      <motion.div
        className="absolute right-[15%] top-[25%] text-[#3c87f7] opacity-20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Building2 size={40} />
      </motion.div>
      <motion.div
        className="absolute left-[20%] bottom-[20%] text-[#3c87f7] opacity-20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <MapPin size={36} />
      </motion.div>
    </>
  );
}
