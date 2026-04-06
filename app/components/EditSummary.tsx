"use client";

import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import styles from "../styles/home.module.css";
import CustomModal from "./ui/Modal";
import Input from "./ui/Input";
import CustomButton from "./ui/Button";

type EditSummaryProps = {
  id: number;
  entrySummary: string;
  updateEntrySummary: (id: number, summary: string) => Promise<void>;
};

const EditSummary: React.FC<EditSummaryProps> = ({
  id,
  entrySummary,
  updateEntrySummary,
}) => {
  const [show, setShow] = useState(false);
  const [summary, setSummary] = useState(entrySummary); // We initialize the summary state with the current entrySummary, which allows us to keep track of the updated summary as the user types in the input field. This way, when the user clicks the "Update Summary" button, we can send the updated summary to the API for updating the entry.

  const handleClose = () => {
    setShow(false);
    setSummary(entrySummary);
  };

  const handleShow = () => setShow(true);

  //update summary
  const handleUpdateSummary = async () => {
    try {
      await updateEntrySummary(id, summary);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CustomButton
        className={styles.edit}
        color="primary"
        variant="text"
        onClick={handleShow}
      >
        <EditOutlinedIcon />
      </CustomButton>
      <CustomModal open={show} onClose={handleClose} title="Update Summary">
        <Input
          multiline
          name="summary"
          fullWidth
          required
          label="Enter Summary..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSummary(e.target.value)
          }
          value={summary}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <CustomButton
            variant="contained"
            color="inherit"
            fullWidth
            onClick={handleUpdateSummary}
            style={{ backgroundColor: "#3C93A7", color: "#fff" }}
          >
            Update Summary
          </CustomButton>
        </div>
      </CustomModal>
    </>
  );
};

export default EditSummary;
