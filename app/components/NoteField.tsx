"use-client";

import React, { useState } from "react";

import Fab from "@mui/material/Fab";
import Input from "./ui/Input";
import AddIcon from "@mui/icons-material/Add";

function NoteField({
  entry,
  addNoteAPI,
}: {
  entry: string;
  addNoteAPI: (id: string, note: string) => Promise<void>;
}) {
  const [note, setNote] = useState("");
  const addNoteAPIHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNoteAPI(entry, note);
    setNote("");
  };

  return (
    <div>
      <form onSubmit={addNoteAPIHandler}>
        <div className="flex gap-3 p-3">
          <Input
            fullWidth
            label="add note"
            id="fullWidth"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3c93a7" },
                "&:hover fieldset": { borderColor: "#3c93a7" },
                "&.Mui-focused fieldset": { borderColor: "#3c93a7" },
              },
              "& .MuiInputLabel-root": { color: "#3c93a7" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#3c93a7" },
            }}
          />
          <Fab
            type="submit"
            aria-label="add"
            sx={{
              backgroundColor: "#3c93a7",
              color: "#fff",
              "&:hover": { backgroundColor: "#beb1a0" },
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </form>
    </div>
  );
}

export default NoteField;
