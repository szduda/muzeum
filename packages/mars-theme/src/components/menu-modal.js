import { useRef } from 'react'
import { styled, css, connect } from "frontity";
import Link from "./link";
import { Icon, Slide } from './theme'

const MenuModal = ({ state, actions }) => {
  const { menu, isLandscape, isSettingsOpen } = state.theme;
  const bottomRef = useRef()

  const SettingsToggle = props => (
    <button
      onClick={actions.theme.toggleSettings}
      css={css`
        display: flex; 
        align-items: center;
        border: 0;
        background: 0;
        color: #fffff0;
        font-size: 1rem;

        svg {
          ${isSettingsOpen && `fill: #f9c959;`}
        }
      `} {...props} />
  )

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
            aria-label={link.includes('mission') ? 'highlight' : undefined}
          >
            {name}
          </MenuLink>
        ))}
        <MenuLink link="/mission" $highlight={true}>
          Mission
        </MenuLink>
        <span ref={bottomRef} />
      </MenuContent>

      <SettingsContent landscape={isLandscape} open={isSettingsOpen} />

      <IconRowWrapper>
        <Icon.Search />
        {isLandscape && (
          <SettingsToggle>
            <Icon.Gear />
          </SettingsToggle>
        )}
      </IconRowWrapper>

      {!isLandscape && (
        <SettingsWrapper>
          <SettingsToggle>
            <Icon.Gear size={64} color="#d4d4d4" />
          </SettingsToggle>
        </SettingsWrapper>
      )}

      <ScrollDownButton
        onClick={() => bottomRef.current.scrollIntoView({ behavior: 'smooth' })}
        landscape={isLandscape}
      >
        <Icon.Arrow angle={180} />
      </ScrollDownButton>
    </>
  );
};

const SettingsContent = ({ landscape, open }) => (
  <Slide left opaque={true} open={open}>
    <MenuContent css={css`
      height: calc(100vh - ${landscape ? 64 : 162}px); 
      width: 100%; 
      background: #555;
    `}>
      <MenuLink link={"#"}>Toggle dark mode</MenuLink>
      <MenuLink link={"#"}>Font size</MenuLink>
      <MenuLink link={"#"}>Change language</MenuLink>
    </MenuContent>
  </Slide>
)

const ScrollDownButton = styled.button`
  ${props => !props.landscape && `display: none;`}
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
`

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
`

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  background: #444;
  padding: 1rem 0;
  z-index: 4;
  bottom: 0;
  width: 100%;
`

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

const MenuContent = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  margin: 4rem 0 0;
  overflow-y: auto;
  height: calc(100vh - 52px);
  box-sizing: border-box;
  background: #444;
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 2px solid transparent;
  
  color: ${props => props.$highlight ? '#f9c959' : '#fffff0' } !important;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items:center;
  line-height: 1;
  text-align: center;
  font-variant: all-small-caps;

  :last-of-type {
    margin-bottom: 2rem;
  }

  &:hover {
    background-color: #f9c959;
    text-decoration: none;
  }

  :focus {
    background-color: #f9c95922;
  }

  &[aria-current="page"] {
    background-color: #888;
  }
`;

export default connect(MenuModal);
