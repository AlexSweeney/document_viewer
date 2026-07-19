import MuiTextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";
import type { TextFieldSize } from "./textFieldSizes";
import { getTextFieldStyles, textFieldStyles } from "./TextField.styles";

type TextFieldProps = {
  label: string;
  value?: string;
  size?: TextFieldSize;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TextField = ({
  label,
  value,
  size = "medium",
  onChange,
}: TextFieldProps) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <MuiTextField
      label={label}
      value={value}
      variant="filled"
      sx={textFieldStyles}
      style={getTextFieldStyles(size)}
      onChange={changeHandler}
    />
  );
};
