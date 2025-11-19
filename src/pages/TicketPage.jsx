import React from "react";
import { motion } from "framer-motion";
import DataTableDemo from "@/components/TicketTable";
import { TicketDetailDialog } from "@/components/TicketDetail";
import HeaderText from "@/components/HeaderText";

function TicketPage({ tickets, loading, onDeleteTicket, machines=[], onEditTicket }) {
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState(null);

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setDetailOpen(true);
  };

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

        <DataTableDemo tickets={tickets} onViewDetails={handleViewDetails} onDeleteTicket={onDeleteTicket} machines={machines} onEditTicket={onEditTicket} />

        {/* Ticket Detail Modal */}
        <TicketDetailDialog 
          ticket={selectedTicket}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />
      </div>
    </motion.div>
  );
}

export default TicketPage;
