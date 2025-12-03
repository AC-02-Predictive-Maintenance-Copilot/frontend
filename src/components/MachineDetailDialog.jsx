import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import EditMachineDialog from "./EditMachineDialog";
import ConfirmDialog from "./ConfirmDialog";

function MachineDetailDialog({
  open,
  onOpenChange,
  machine=[],
  onDelete,
  onEdit,
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = React.useState(null);
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (machineId, productId) => {
    setDeleteDialogOpen(true);
    setSelectedMachineId(machineId);
    setSelectedProductId(productId);
  };

  const handleConfirmDelete = async () => {
    if (selectedMachineId) {
      await onDelete(selectedMachineId);
      setDeleteDialogOpen(false);
      setSelectedMachineId(null);
    }
  };
  return (
    <>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Confirmation"
        description={`Are you sure you want to delete machine with ID ${selectedProductId}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Machine Details</DialogTitle>
            <DialogDescription>
              View and manage machine information
            </DialogDescription>
          </DialogHeader>

          {machine && (
            <div className="space-y-6">
              {/* Machine Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Product ID
                    </p>
                    <p className="text-lg font-semibold">{machine.productId}</p>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border border-green-200">
                    Active
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Machine Name
                  </p>
                  <p className="text-base font-medium">{machine.name}</p>
                </div>

                {machine.description && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-sm">{machine.description}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Machine ID
                  </p>
                  <p className="text-xs font-mono bg-muted p-2 rounded">
                    {machine.id}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDeleteClick(machine.id, machine.productId)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button size="sm" className="flex-1" onClick={handleEditClick}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Machine Dialog */}
      <EditMachineDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        machine={machine}
        onConfirm={onEdit}
        onOpenChangeParent={onOpenChange}
      />
    </>
  );
}

export default MachineDetailDialog;
