import MenuItem from "@mui/material/MenuItem";
import MuiTextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";
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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SelectField = ({
  label,
  options,
  value,
  size = "medium",
  onChange,
}: SelectFieldProps) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <MuiTextField
      select
      label={label}
      value={value}
      variant="filled"
      sx={selectFieldStyles}
      style={getSelectFieldStyles(size)}
      onChange={changeHandler}
    >
      {options.map((option) => {
        const key = option.value;

        return (
          <MenuItem key={key} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </MuiTextField>
  );
};

export type { SelectFieldOption };
