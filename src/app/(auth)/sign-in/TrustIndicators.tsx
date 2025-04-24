import { motion } from "framer-motion";
import { Shield, User, Building2 } from "lucide-react";

export default function TrustIndicators() {
  return (
    <motion.div
      className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex items-center gap-1">
        <Shield size={16} className="text-green-500" />
        <span>Баталгаатай Нэвтрэх</span>
      </div>
      <div className="flex items-center gap-1">
        <User size={16} className="text-green-500" />
        <span>10,000+ Хэрэглэгч</span>
      </div>
      <div className="flex items-center gap-1">
        <Building2 size={16} className="text-green-500" />
        <span>Найдвартай Ажилтан</span>
      </div>
    </motion.div>
  );
}
