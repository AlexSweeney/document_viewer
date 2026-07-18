import MuiTextField from "@mui/material/TextField";
import type { TextInputSize } from "./textInputSizes";

type TextInputProps = {
  label: string;
  size?: TextInputSize;
  onChange?: (value: string) => void;
};

const widthMap = {
  small: "12rem",
  medium: "20rem",
  large: "32rem",
} as const satisfies Record<TextInputSize, string>;

export const TextInput = ({
  label,
  size = "medium",
  onChange,
}: TextInputProps) => {
  return (
    <MuiTextField
      label={label}
      style={{ width: widthMap[size] }}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
};
