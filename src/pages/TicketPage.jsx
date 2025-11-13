import React from "react";
import { motion } from "framer-motion";
import DataTableDemo from "@/components/TicketTable";
import HeaderText from "@/components/HeaderText";

function TicketPage({ tickets, loading }) {
  return (
    <motion.div 
      className="flex-1 w-full p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <HeaderText
          title="View Tickets"
          subtitle="Manage and track your maintenance requests"
        />
        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading tickets...</p>
          </div>
        )}

        <DataTableDemo tickets={tickets} />
      </div>
    </motion.div>
  );
}

export default TicketPage;
