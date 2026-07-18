import MuiTextField from "@mui/material/TextField";
import type { TextFieldSize } from "./textFieldSizes";
import { getTextFieldStyles, textFieldStyles } from "./TextField.styles";

type TextFieldProps = {
  label: string;
  value?: string;
  size?: TextFieldSize;
  onChange?: (value: string) => void;
};

export const TextField = ({
  label,
  value,
  size = "medium",
  onChange,
}: TextFieldProps) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      variant="filled"
      sx={textFieldStyles}
      style={getTextFieldStyles(size)}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
};
