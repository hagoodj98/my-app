"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import styles from "../styles/home.module.css";
import CustomModal from "./ui/Modal";
import Input from "./ui/Input";

interface UpdateNoteProps {
  id: string;
  note: string;
  updateNoteAPI: (data: {
    prevNote: { note: string; noteId: string };
  }) => Promise<void>;
}

function UpdateNote({ id, note, updateNoteAPI }: UpdateNoteProps) {
  const [show, setShow] = useState(false);
  const [prevNote, setNewNote] = useState({
    note: note,
    noteId: id,
  });
  const handleClose = () => {
    setShow(false);
    setNewNote({
      note: note,
      noteId: id,
    });
  };

  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    try {
      await updateNoteAPI({ prevNote });
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button className={styles.edit} color="primary" onClick={handleShow}>
        <EditOutlinedIcon />
      </Button>
      <CustomModal open={show} onClose={handleClose} title="Update Note">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <Input
            multiline
            value={prevNote.note}
            fullWidth
            label=""
            onChange={(e) => setNewNote({ ...prevNote, note: e.target.value })}
          />

          <Button
            style={{ backgroundColor: "#3C93A7", color: "#fff" }}
            color="primary"
            fullWidth
            type="submit"
          >
            Update Note
          </Button>
        </form>
      </CustomModal>
    </>
  );
}
export default UpdateNote;
