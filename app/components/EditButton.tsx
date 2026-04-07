"use client";
import React, { useState } from "react";
import CustomModal from "./ui/Modal";
import CustomButton from "./ui/Button";
import Input from "./ui/Input";

interface EditMeProps {
  prevNote: string;
  setNewNote: (note: string) => void;
}

function EditMe({ prevNote, setNewNote }: EditMeProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div>
      <CustomModal open={show} onClose={handleClose} title="Update Note">
        <form>
          <Input
            multiline
            name="prevNote"
            required
            label="Enter Note..."
            onChange={(e) => setNewNote(e.target.value)}
            value={prevNote}
          />
        </form>

        <CustomButton color="secondary" onClick={handleClose}>
          Close
        </CustomButton>
        <CustomButton color="primary" onClick={handleClose}>
          Update Note
        </CustomButton>
      </CustomModal>
    </div>
  );
}

export default EditMe;
