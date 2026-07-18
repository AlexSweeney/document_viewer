import MenuItem from "@mui/material/MenuItem";
import MuiTextField from "@mui/material/TextField";
import type { SelectFieldSize } from "./selectFieldSizes";
import { getSelectFieldStyles, selectFieldStyles } from "./SelectField.styles";

type SelectFieldOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: readonly SelectFieldOption[];
  value?: string;
  size?: SelectFieldSize;
  onChange?: (value: string) => void;
};

export const SelectField = ({
  label,
  options,
  value,
  size = "medium",
  onChange,
}: SelectFieldProps) => {
  return (
    <MuiTextField
      select
      label={label}
      value={value}
      variant="filled"
      sx={selectFieldStyles}
      style={getSelectFieldStyles(size)}
      onChange={(event) => onChange?.(event.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiTextField>
  );
};

export type { SelectFieldOption };
