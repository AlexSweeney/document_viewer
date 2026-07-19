import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { panelWrapperStyles } from "../../../App/App.styles";
import { getContentStyles } from "../../organisms/DocumentPanel/parts/DocumentPanelBody/DocumentPanelBody.styles";
import { getControlsStyles } from "../../organisms/DocumentPanel/parts/DocumentPanelControls/DocumentPanelControls.styles";
import { Icon, type IconName, type IconProps } from ".";

const navigationIconNames: IconName[] = [
  "leftChevron",
  "rightChevron",
  "upArrow",
  "downArrow",
];

const documentIconNames: IconName[] = [
  "pdf",
  "doc",
  "csv",
  "mov",
  "xlsx",
  "folder",
];

const storyPanelWrapperStyles: CSSProperties = {
  ...panelWrapperStyles,
  flexDirection: "column",
  alignItems: "stretch",
};

const iconGridStyles: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1rem",
  alignItems: "center",
  justifyItems: "center",
  width: "100%",
};

const iconCellStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
};

const isNavigationIcon = (name: IconName) => navigationIconNames.includes(name);

const IconInAppContext = ({ name, size }: IconProps) => {
  const theme = useTheme();

  if (isNavigationIcon(name)) {
    return (
      <div style={storyPanelWrapperStyles}>
        <div style={getControlsStyles(theme)}>
          <Icon name={name} size={size} />
        </div>
      </div>
    );
  }

  const panelBodyStyles: CSSProperties = {
    ...getContentStyles(theme),
    flex: undefined,
    minHeight: "auto",
    color: theme.palette.primary.dark,
  };

  return (
    <div style={storyPanelWrapperStyles}>
      <div style={panelBodyStyles}>
        <Icon name={name} size={size} />
      </div>
    </div>
  );
};

const IconGrid = ({
  names,
  iconColor,
}: {
  names: IconName[];
  iconColor?: string;
}) => (
  <div style={iconGridStyles}>
    {names.map((name) => {
      const key = name;
      const cellStyles: CSSProperties = iconColor
        ? { ...iconCellStyles, color: iconColor }
        : iconCellStyles;

      return (
        <div key={key} style={cellStyles}>
          <Icon name={name} />
          <span>{name}</span>
        </div>
      );
    })}
  </div>
);

const AllNamesLayout = () => {
  const theme = useTheme();
  const panelBodyStyles: CSSProperties = {
    ...getContentStyles(theme),
    flex: undefined,
    minHeight: "auto",
  };
  const controlsStyles = getControlsStyles(theme);

  return (
    <div style={storyPanelWrapperStyles}>
      <div style={controlsStyles}>
        <IconGrid names={navigationIconNames} />
      </div>
      <div style={panelBodyStyles}>
        <IconGrid
          names={documentIconNames}
          iconColor={theme.palette.primary.dark}
        />
      </div>
    </div>
  );
};

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    appSurface: "none",
  },
  argTypes: {
    name: {
      control: "select",
      options: [...navigationIconNames, ...documentIconNames],
    },
  },
  args: {
    name: "pdf",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ name, size }) => <IconInAppContext name={name} size={size} />,
};

export const AllNames: Story = {
  render: () => <AllNamesLayout />,
};
