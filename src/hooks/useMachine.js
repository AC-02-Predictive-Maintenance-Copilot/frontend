import { getMachines, addMachine } from "@/utils/api";
import { useCallback, useState } from "react";

export function useMachine() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMachines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { error, data } = await getMachines();
      if (!error) {
        setMachines(data);
      } else {
        setError("Failed to fetch machines");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching machines:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const useAddMachine = useCallback(async (newMachine) => {
    try {
      const { error, data } = await addMachine(newMachine);
      if (!error) {
        setMachines((prevMachines) => [data, ...prevMachines]);
        return data;
      } else {
        throw new Error("Failed to add machine");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding machine:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    machines,
    loading,
    error,
    fetchMachines,
    useAddMachine,
  };
}
