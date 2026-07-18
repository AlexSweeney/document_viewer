import MuiTextField from "@mui/material/TextField";
import type { TextFieldSize } from "./textFieldSizes";

type TextFieldProps = {
  label: string;
  size?: TextFieldSize;
  onChange?: (value: string) => void;
};

const widthMap: Record<TextFieldSize, string> = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
};

export const TextField = ({
  label,
  size = "medium",
  onChange,
}: TextFieldProps) => {
  return (
    <MuiTextField
      label={label}
      style={{ width: widthMap[size] }}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
};
