import React from "react";
import { TextField, SxProps, Theme } from "@mui/material";

interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  fullWidth?: boolean;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  id?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  sx?: SxProps<Theme>;
}

const Input = ({
  label,
  value,
  onChange,
  name,
  fullWidth,
  multiline,
  helperText,
  required,
  id,
  variant,
  sx,
}: InputProps) => {
  return (
    <div>
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        multiline={multiline}
        name={name}
        fullWidth={fullWidth}
        helperText={helperText}
        required={required}
        sx={sx}
      />
    </div>
  );
};

export default Input;
