import React from "react";
import { motion } from "framer-motion";
import CreateTicket from "@/components/ticket/CreateTicket";
import HeaderText from "@/components/HeaderText";

function CreateTicketPage({ machines = [], onCreateTicket, onTicketCreated }) {
  return (
    <motion.div 
      className="flex-1 w-full p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-5xl mx-auto">
        <HeaderText
          title="Create New Ticket"
          subtitle="Submit a maintenance request or report an issue"
        />
      <CreateTicket onCreateTicket={onCreateTicket} onTicketCreated={onTicketCreated} machines={machines} />
      </div>
    </motion.div>
  );
}

export default CreateTicketPage;
