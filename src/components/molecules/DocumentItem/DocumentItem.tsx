import ButtonBase from "@mui/material/ButtonBase";
import type { DocumentItem as DocumentItemData } from "../../../types/document";
import { Icon } from "../../atoms/Icon";
import { Typography } from "../../atoms/Typography";
import {
  containerStyles,
  ICON_SIZE,
  iconStyles,
  textContainerStyles,
} from "./DocumentItem.styles";

type DocumentItemProps = {
  item: DocumentItemData;
  onClick?: () => void;
};

export const DocumentItem = ({ item, onClick }: DocumentItemProps) => {
  const added = item.type === "folder" ? undefined : item.added;

  return (
    <ButtonBase
      aria-label={`Open ${item.name}`}
      disableRipple
      onClick={onClick}
      sx={containerStyles}
    >
      <div className="document-item-icon" style={iconStyles}>
        <Icon name={item.type} size={ICON_SIZE} />
      </div>
      <div className="document-item-text" style={textContainerStyles}>
        <Typography variant="body2">
          <strong>{item.name}</strong>
        </Typography>
        <Typography variant="caption">{item.type}</Typography>
        {added ? <Typography variant="caption">{added}</Typography> : null}
      </div>
    </ButtonBase>
  );
};
