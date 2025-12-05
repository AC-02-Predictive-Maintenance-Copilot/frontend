import React, { useState } from "react";
import MachineCard from "@/components/MachineCard";
import MachineDetailDialog from "@/components/MachineDetailDialog";
import HeaderText from "@/components/HeaderText";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { machineContainerVariants, emptyStateVariants } from "@/components/MotionVariant";
import { toast } from "sonner";

function ViewMachinePage({ machines = [], onDeleteMachine, onEditMachine, onFetchMachineStatus }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Filter machines based on search query
  const filteredMachines = machines.filter((machine) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      machine.nama?.toLowerCase().includes(searchLower) ||
      machine.id?.toString().toLowerCase().includes(searchLower) ||
      machine.name?.toLowerCase().includes(searchLower) ||
      machine.productId?.toString().toLowerCase().includes(searchLower)
    );
  });

  const handleCardClick = (machine) => {
    setSelectedMachine(machine);
    setDetailDialogOpen(true);
  };

  const handleDeleteMachine = async (machineId) => {
    if (onDeleteMachine) {
      toast.promise(onDeleteMachine(machineId), {
        loading: "Deleting machine...",
        success: "Machine deleted successfully! 🗑️",
        error: (err) => {
          return err?.message || "Failed to delete machine";
        },
      });
      setDetailDialogOpen(false);
    }
  };

  const handleEditMachine = async (machineId, machineData) => {
    if (onEditMachine) {
      toast.promise(onEditMachine(machineId, machineData), {
        loading: "Updating machine...",
        success: "Machine updated successfully! ✏️",
        error: (err) => {
          return err?.message || "Failed to edit machine";
        },
      });
      setDetailDialogOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 w-full p-6"
    >
      <div className="container mx-auto space-y-6 max-w-5xl">
        <HeaderText
          title="Machines"
          subtitle="View and manage all your machines"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Button belum fungsi rencana berisi filter kondisi mesin nantinya */}
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="text-sm text-muted-foreground">
              {filteredMachines.length} of {machines.length} machines
            </div>
          </div>
        </div>

        {/* Machine Cards Grid */}
        {filteredMachines.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={machineContainerVariants}
            initial="hidden"
            animate="visible"
            key={searchQuery} // Re-trigger animation when search changes
          >
            {filteredMachines.map((machine) => (
              <MachineCard 
                key={machine.id} 
                machine={machine}
                onCardClick={handleCardClick}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 text-center"
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No machines found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No machines match "${searchQuery}"`
                : "No machines available"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Machine Detail Dialog */}
      <MachineDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        machine={selectedMachine}
        onDelete={handleDeleteMachine}
        onEdit={handleEditMachine}
        onFetchStatus={onFetchMachineStatus}
      />
    </motion.div>
  );
}

export default ViewMachinePage;
