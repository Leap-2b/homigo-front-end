"use client";
import { motion } from "framer-motion";

import LoginTabs from "./LoginTabs";
import TrustIndicators from "./TrustIndicators";
import BackgroundElements from "./BackgroundElements";

export default function EnhancedLoginPage() {
  return (
    <div className="min-h-[82vh] bg-gradient-to-b mt-30 from-white to-gray-50">
      <BackgroundElements />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <LoginTabs />
          </div>
        </motion.div>

        <TrustIndicators />
      </main>
    </div>
  );
}
