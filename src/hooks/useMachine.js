import { getMachines } from "@/utils/api";
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
      if(!error) {
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

  return {
    machines,
    loading,
    error,
    fetchMachines,
  };
}


