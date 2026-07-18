import ButtonBase from "@mui/material/ButtonBase";
import MuiTypography from "@mui/material/Typography";

type BreadCrumbProps = {
  label: string;
  onClick: () => void;
};

export const BreadCrumb = ({ label, onClick }: BreadCrumbProps) => {
  return (
    <ButtonBase
      aria-label={`Navigate to ${label}`}
      onClick={onClick}
      sx={{ color: "inherit", verticalAlign: "inherit" }}
    >
      <MuiTypography variant="body2" color="inherit" component="span">
        {label}
      </MuiTypography>
    </ButtonBase>
  );
};
