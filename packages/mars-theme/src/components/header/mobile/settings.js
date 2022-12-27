import { css } from "frontity";
import { GearIcon, Slide } from "../../theme";
import { MenuContent, MenuLink } from "./menu-modal";

export const SettingsToggle = ({ open, children, ...props }) => (
  <button
    css={css`
      display: flex;
      align-items: center;
      border: 0;
      background: 0;
      color: #fffff0;
      font-size: 1rem;

      svg {
        ${open && `fill: #f9c959;`}
      }
    `}
    {...props}
  >
    {children || <GearIcon />}
  </button>
);

export const SettingsContent = ({ landscape, open }) => (
  <Slide left opaque={true} open={open}>
    <MenuContent
      css={css`
        height: calc(100vh - ${landscape ? 64 : 162}px);
        width: 100%;
        background: #555;
      `}
    >
      <MenuLink link={"#"}>Toggle dark mode</MenuLink>
      <MenuLink link={"#"}>Font size</MenuLink>
      <MenuLink link={"#"}>Change language</MenuLink>
    </MenuContent>
  </Slide>
);
