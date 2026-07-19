import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "../../../..";
import {
  getContentStyles,
  getErrorMessageStyles,
  getLoadingContentStyles,
} from "./DocumentPanelBody.styles";

type DocumentPanelBodyProps = {
  children?: ReactNode;
  errorMessage?: string;
  isError?: boolean;
  isLoading?: boolean;
};

export const DocumentPanelBody = ({
  children,
  errorMessage,
  isError = false,
  isLoading = false,
}: DocumentPanelBodyProps) => {
  const theme = useTheme();

  const getBodyStyles = () => {
    if (isError || isLoading) {
      return getLoadingContentStyles(theme);
    }

    return getContentStyles(theme);
  };

  const renderContent = () => {
    if (isError) {
      return (
        <Typography variant="body1">
          <span role="alert" style={getErrorMessageStyles(theme)}>
            {errorMessage}
          </span>
        </Typography>
      );
    }

    if (isLoading) {
      return <CircularProgress aria-label="Loading documents" />;
    }

    return children;
  };

  return <div style={getBodyStyles()}>{renderContent()}</div>;
};
