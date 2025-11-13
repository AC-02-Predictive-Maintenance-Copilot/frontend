import React from "react";
import { motion } from "framer-motion";
import HeaderText from "@/components/HeaderText";

function OverviewPage() {
  // Rencananya halaman ini akan menampilkan ringkasan data mesin dalam bentuk grafik
  // Selin itu juga ada card untuk predicitve maintenancenya
  return (
    <motion.div 
      className="flex-1 w-full p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <HeaderText
          title="Overview"
          subtitle="Track and analyze your machines data"
        />
      </div>
    </motion.div>
  );
}

export default OverviewPage;
