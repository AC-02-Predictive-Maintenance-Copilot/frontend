import React from "react";
import { DataTableDemo } from "@/components/TicketTable";

function TicketPage({ tickets, loading }) {
  return (
    <div className="flex-1 w-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ticket</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all maintenance tickets
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading tickets...</p>
        </div>
      )}

      <DataTableDemo tickets={tickets} />
    </div>
  );
}

export default TicketPage;
