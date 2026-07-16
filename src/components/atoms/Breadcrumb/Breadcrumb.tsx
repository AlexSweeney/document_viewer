import MuiTypography from "@mui/material/Typography";

type BreadCrumbProps = {
  label: string;
};

export const BreadCrumb = ({ label }: BreadCrumbProps) => {
  return (
    <MuiTypography variant="body2" color="inherit">
      {label}
    </MuiTypography>
  );
};
