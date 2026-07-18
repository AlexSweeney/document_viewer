import MenuItem from "@mui/material/MenuItem";
import MuiTextField from "@mui/material/TextField";
import type { SelectFieldSize } from "./selectFieldSizes";
import { getSelectFieldStyles } from "./SelectField.styles";

type SelectFieldOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: SelectFieldOption[];
  size?: SelectFieldSize;
  onChange?: (value: string) => void;
};

export const SelectField = ({
  label,
  options,
  size = "medium",
  onChange,
}: SelectFieldProps) => {
  return (
    <MuiTextField
      select
      label={label}
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
