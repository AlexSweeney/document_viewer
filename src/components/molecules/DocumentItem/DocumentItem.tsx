import ButtonBase from "@mui/material/ButtonBase";
import type { DocumentItemType } from "../../../types/document";
import { Icon } from "../../atoms/Icon";
import { Typography } from "../../atoms/Typography";
import {
  containerStyles,
  ICON_SIZE,
  iconStyles,
  textContainerStyles,
} from "./DocumentItem.styles";

type DocumentItemProps = {
  name: string;
  type: DocumentItemType;
  dateCreated: string;
  onClick?: () => void;
};

export const DocumentItem = ({
  name,
  type,
  dateCreated,
  onClick,
}: DocumentItemProps) => {
  return (
    <ButtonBase
      aria-label={`Open ${name}`}
      disableRipple
      onClick={onClick}
      sx={containerStyles}
    >
      <div className="document-item-icon" style={iconStyles}>
        <Icon name={type} size={ICON_SIZE} />
      </div>
      <div className="document-item-text" style={textContainerStyles}>
        <Typography variant="body2">
          <strong>{name}</strong>
        </Typography>
        <Typography variant="caption">{type}</Typography>
        <Typography variant="caption">{dateCreated}</Typography>
      </div>
    </ButtonBase>
  );
};
