// ** React Imports
import { MouseEvent, useState, ReactNode } from "react";

// ** Next Import
import Link, { LinkProps } from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu, { MenuProps } from "@mui/material/Menu";
import Divider, { DividerProps } from "@mui/material/Divider";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { IconProps } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type OptionDividerType = {
  divider: boolean;
  dividerProps?: DividerProps;
  href?: never;
  icon?: never;
  text?: never;
  linkProps?: never;
  menuItemProps?: never;
};
export type OptionMenuItemType = {
  text: ReactNode;
  icon?: ReactNode;
  linkProps?: LinkProps;
  href?: LinkProps["href"];
  menuItemProps?: MenuItemProps;
  divider?: never;
  dividerProps?: never;
};

export type OptionType = string | OptionDividerType | OptionMenuItemType;

export type OptionsMenuType = {
  icon?: ReactNode;
  options: OptionType[];
  leftAlignMenu?: boolean;
  iconButtonProps?: IconButtonProps;
  iconProps?: Omit<IconProps, "icon">;
  menuProps?: Omit<MenuProps, "open">;
  handleClickOption?: () => {};
};

const MenuItemWrapper = ({
  children,
  option,
}: {
  children: ReactNode;
  option: OptionMenuItemType;
}) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        {...option.linkProps}
        sx={{
          px: 4,
          py: 1.5,
          width: "100%",
          display: "flex",
          color: "inherit",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {children}
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

const OptionsMenu = (props: OptionsMenuType) => {
  // ** Props
  const {
    icon,
    options,
    menuProps,
    iconProps,
    leftAlignMenu,
    iconButtonProps,
  } = props;

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ** Hook & Var

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        {...iconButtonProps}
      >
        {icon ? icon : <MoreVertIcon />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })}
        {...menuProps}
      >
        {options.map((option: OptionType, index: number) => {
          if (typeof option === "string") {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            );
          } else if ("divider" in option) {
            return (
              option.divider && <Divider key={index} {...option.dividerProps} />
            );
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps}
                {...(option.href && { sx: { p: 0 } })}
                onClick={(e) => {
                  handleClose();
                  option.menuItemProps && option.menuItemProps.onClick
                    ? option.menuItemProps.onClick(e)
                    : null;
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};

export default OptionsMenu;
