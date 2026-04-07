import React from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  maxWidthClass?: string;
  icon?: React.ReactNode;
}

const CustomModal = ({
  title,
  children,
  onClose,
  open,
  subtitle,
  maxWidthClass,
  icon,
}: CustomModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className={`modal-content ${maxWidthClass}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            minWidth: "320px",
            maxWidth: maxWidthClass ? undefined : "480px",
            width: "90%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            outline: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <h2 id="modal-title" style={{ margin: 0 }}>
              {title}
            </h2>
            <IconButton onClick={onClose} size="small" aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          {icon && <div className="modal-icon">{icon}</div>}
          {subtitle && <p id="modal-description">{subtitle}</p>}
          <div className="modal-children">{children}</div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
