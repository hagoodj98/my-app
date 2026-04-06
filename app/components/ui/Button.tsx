import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const CustomButton = ({
  variant = "contained",
  color = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  className,
  style,
  children,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      style={style}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
