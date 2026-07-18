import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getContentStyles,
  getLoadingContentStyles,
} from "./DocumentPanelBody.styles";

type DocumentPanelBodyProps = {
  children?: ReactNode;
  isLoading?: boolean;
};

export const DocumentPanelBody = ({
  children,
  isLoading = false,
}: DocumentPanelBodyProps) => {
  const theme = useTheme();

  return (
    <div
      style={
        isLoading ? getLoadingContentStyles(theme) : getContentStyles(theme)
      }
    >
      {isLoading ? (
        <CircularProgress aria-label="Loading documents" />
      ) : (
        children
      )}
    </div>
  );
};
