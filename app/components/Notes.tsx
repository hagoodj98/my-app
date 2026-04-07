"use client";
import React from "react";

import { Work_Sans } from "next/font/google";
import styles from "../styles/home.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteField from "./NoteField";
import { NoteType } from "./types";

import UpdateNote from "./UpdateNote";

const worksans = Work_Sans({ subsets: ["latin"], display: "swap" });

interface NotesProps {
  notes: NoteType[];
  entry: string;
  deleteNoteAPI: (id: string | undefined) => Promise<void>;
  addNoteAPI: (id: string, note: string) => Promise<void>;
  updateNoteAPI: (data: {
    prevNote: { note: string; noteId: string };
  }) => Promise<void>;
}

const Notes: React.FC<NotesProps> = ({
  notes,
  entry,
  deleteNoteAPI,
  updateNoteAPI,
  addNoteAPI,
}) => {
  return (
    <div>
      {notes.map((note, index) => (
        <div className="flex" key={index}>
          <div>
            <p className={worksans.className}>{note.note}</p>
          </div>
          <div className="flex">
            <UpdateNote
              note={note.note}
              id={note.note_id ?? ""}
              updateNoteAPI={updateNoteAPI}
            />
            <IconButton
              className={styles.delete}
              onClick={() => deleteNoteAPI(note.note_id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
      <NoteField entry={entry} addNoteAPI={addNoteAPI} />
    </div>
  );
};

export default Notes;
