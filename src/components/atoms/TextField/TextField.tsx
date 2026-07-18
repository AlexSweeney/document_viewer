import MuiTextField from "@mui/material/TextField";
import type { TextFieldSize } from "./textFieldSizes";

type TextFieldProps = {
  label: string;
  size?: TextFieldSize;
  onChange?: (value: string) => void;
};

const widthMap = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
} as const satisfies Record<TextFieldSize, string>;

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
