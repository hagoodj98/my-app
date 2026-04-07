"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Entry, NoteType } from "../components/types";

export const useNotes = (id: string) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [entry, setEntry] = useState<Entry>({} as Entry);

  const entryIdAPI = useCallback(async () => {
    try {
      const response = await fetch(`/api/notes/${id}`);
      const data = await response.json();
      console.log(data);

      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const deleteNoteAPI = useCallback(
    async (id: string | undefined) => {
      if (!id) return;
      try {
        await fetch(`/api/notes/${id}`, {
          method: "DELETE",
        });

        await entryIdAPI();
        toast.success("Note deleted");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete note");
      }
    },
    [entryIdAPI],
  );
  const addNoteAPI = useCallback(
    async (id: string, note: string) => {
      try {
        await fetch(`/api/notes/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newNote: note,
            id: id,
          }),
        });
        await entryIdAPI();
        toast.success("Note added");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add note");
      }
    },
    [entryIdAPI],
  );

  const updateNoteAPI = useCallback(
    async ({ prevNote }: { prevNote: { note: string; noteId: string } }) => {
      try {
        const body = { prevNote };
        console.log(body);
        await fetch(`/api/notes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prevNote: body.prevNote.note,
            id: body.prevNote.noteId,
          }),
        });
        await entryIdAPI();
        toast.success("Note updated");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        toast.error("Failed to update note");
      }
    },
    [entryIdAPI, id],
  );

  useEffect(() => {
    const fetchEntry = async () => {
      await entryIdAPI();
    };
    fetchEntry();
  }, [entryIdAPI]);
  return {
    notes,
    entry,
    setEntry,
    entryIdAPI,
    updateNoteAPI,
    deleteNoteAPI,
    addNoteAPI,
  };
};

export default useNotes;
