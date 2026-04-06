"use client";
import { useCallback, useEffect, useState } from "react";
import { Entry } from "../components/types";

export const useEntries = (entry?: string) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  // Placeholder for any future logic related to entries (e.g., caching, state management, etc.)
  const getEntries = useCallback(async () => {
    // We set loading to true before starting the fetch operation to indicate that the data is being loaded, and we set it back to false after the data has been fetched and the state has been updated, which allows any component using this hook to display a loading indicator while the entries are being fetched.
    setLoading(true);
    if (!entry) {
      const response = await fetch("/api/entries");
      const data: Entry[] = await response.json();
      setEntries(data ?? []);
    } else {
      const response = await fetch(`/api/entry/${entry}`);
      const data = await response.json();
      setEntries(data);
    }
    setLoading(false);
  }, [entry]);
  // We use useCallback for getEntries, deleteEntry, updateEntrySummary, and listSortedEntries to memoize these functions and prevent unnecessary re-renders in any component that uses this hook. This is especially important for functions that are passed down as props to child components, as it helps optimize performance by ensuring that the functions are not recreated on every render unless their dependencies change.
  useEffect(() => {
    // We call getEntries inside useEffect to fetch the entries when the component using this hook mounts. This ensures that we have the latest entries data available for any component that uses this hook.
    const loadEntries = async () => {
      await getEntries();
    };
    loadEntries();
  }, [getEntries]);

  const deleteEntry = useCallback(async (id: number) => {
    try {
      // We make a DELETE request to the API to delete the entry with the specified ID, and if the request is successful, we update the local state by filtering out the deleted entry from the entries array, which ensures that the UI reflects the deletion without needing to refetch all entries from the server.
      await fetch(`/api/entry/${id}`, {
        method: "DELETE",
      });
      // We update the local state to remove the deleted entry, which allows the UI to reflect the deletion immediately without needing to refetch all entries from the server. This is done by filtering the entries array to exclude the entry with the specified ID.
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  const updateEntrySummary = useCallback(
    async (id: number, prevSummary: string) => {
      try {
        // We make a PUT request to the API to update the summary of the entry with the specified ID, and if the request is successful, we update the local state by mapping through the entries array and updating the summary of the entry with the matching ID, which ensures that the UI reflects the updated summary without needing to refetch all entries from the server.
        await fetch(`/api/entry/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prevSummary }),
        });
        // We update the local state to reflect the updated summary, which allows the UI to show the new summary immediately without needing to refetch all entries from the server. This is done by mapping through the entries array and updating the summary of the entry with the matching ID while keeping all other entries unchanged.
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === id ? { ...entry, summary: prevSummary } : entry,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const listSortedEntries = useCallback(async (order: string) => {
    try {
      const response = await fetch(`/api/sort-entry-by?order=${order}`);
      const data: Entry[] = await response.json();
      setEntries(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    getEntries,
    entries,
    loading,
    deleteEntry,
    updateEntrySummary,
    listSortedEntries,
  };
};
