import React from "react";
import AddMachine from "@/components/AddMachine";
import HeaderText from "@/components/HeaderText";

function AddMachinePage({ onAddMachine, onMachineAdded }) {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <HeaderText
          title="Add Machine"
          subtitle="Add a new machine to the system"
        />
        <AddMachine onAddMachine={onAddMachine} onMachineAdded={onMachineAdded} />
      </div>
    </>
  );
}
export default AddMachinePage;
