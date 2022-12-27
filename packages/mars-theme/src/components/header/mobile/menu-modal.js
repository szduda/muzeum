import { useRef } from "react";
import { styled, connect } from "frontity";
import Link from "../../link";
import { ArrowIcon } from "../../theme";
import { SearchContent, SearchToggle } from "./search";
import { SettingsToggle } from "./settings";

const MenuModal = ({ state, actions }) => {
  const { menu, isLandscape, isSettingsOpen, search } = state.theme;
  const {
    search: { toggle },
    toggleSettings,
  } = actions.theme;
  const bottomRef = useRef();

  return (
    <>
      <MenuOverlay />

      <MenuContent as="nav">
        <MenuLink link="/">Home</MenuLink>
        {menu?.map(([name, link]) => (
          <MenuLink
            key={name}
            link={link}
            aria-current={state.router.link === link ? "page" : undefined}
            aria-label={link.includes("mission") ? "highlight" : undefined}
          >
            {name}
          </MenuLink>
        ))}
        <MenuLink link="/about-us" $highlight={true}>
          About us
        </MenuLink>
        <span ref={bottomRef} />
      </MenuContent>

      {/* <SettingsContent landscape={isLandscape} open={isSettingsOpen} /> */}
      <SearchContent landscape={isLandscape} open={search.open} />

      <IconRowWrapper>
        <SearchToggle onClick={toggle} open={search.open} />
        {isLandscape && <SettingsToggle onClick={toggleSettings} />}
      </IconRowWrapper>

      {/* {!isLandscape && (
        <SettingsWrapper>
          <SettingsToggle onClick={toggleSettings}>
            <GearIcon size={64} color="#d4d4d4" />
          </SettingsToggle>
        </SettingsWrapper>
      )} */}

      <ScrollDownButton
        onClick={() => bottomRef.current.scrollIntoView({ behavior: "smooth" })}
        landscape={isLandscape}
      >
        <ArrowIcon angle={180} />
      </ScrollDownButton>
    </>
  );
};

export const MenuContent = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  margin: 4rem 0 0;
  overflow-y: auto;
  height: calc(100vh - 52px);
  box-sizing: border-box;
  background: #444;
`;

export const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 2px solid transparent;
  text-decoration: none;

  color: ${(props) => (props.$highlight ? "#f9c959" : "#fffff0")} !important;
  text-align: center;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  line-height: 1.2;
  text-align: center;
  font-variant: all-small-caps;

  :last-of-type {
    margin-bottom: 2rem;
  }

  &:hover {
    text-decoration: none;
  }

  :focus {
    background-color: #f9c95922;
  }

  &[aria-current="page"] {
    background-color: #888;
  }
`;

const ScrollDownButton = styled.button`
  ${(props) => !props.landscape && `display: none;`}
  border: 0;
  background: 0;
  position: fixed;
  z-index: 3;
  right: 0;
  bottom: 0;
  padding: 1rem;

  svg {
    height: 32px;
    fill: #d4d4d4;
  }
`;

const IconRowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background: #444;
  z-index: 2;
  top: 1rem;
  right: 3rem;
  left: 120px;

  svg {
    height: 24px;
    fill: #d4d4d4;
    padding: 0.25rem;
  }

  > * {
    margin-right: 1rem;
  }
`;

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  background: #444;
  padding: 1rem 0;
  z-index: 4;
  bottom: 0;
  width: 100%;
`;

const MenuOverlay = styled.div`
  background-color: #444;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

export default connect(MenuModal);
