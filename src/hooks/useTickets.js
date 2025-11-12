import { useState, useCallback } from "react";
import { getTickets } from "@/utils/api";

// Custom hook untuk mengelola state tiket dari API
export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Untuk sementara hanya ada fetch tickets dari API
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { error, data } = await getTickets();

      if (!error) {
        setTickets(data);
      } else {
        setError("Failed to fetch tickets");
        console.error("Error fetching tickets:", error);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
  };
}
