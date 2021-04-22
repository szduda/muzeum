import { useRef } from 'react'
import { styled, connect } from "frontity";
import Link from "./link";
import { Icon } from './theme'

const MenuModal = ({ state }) => {
  const { menu, isLandscape } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  const bottomRef = useRef()

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        <MenuLink link="/">Home</MenuLink>
        {isThereLinks &&
          menu.map(([name, link]) => (
            <MenuLink
              key={name}
              link={link}
              aria-current={state.router.link === link ? "page" : undefined}
            >
              {name}
            </MenuLink>
          ))}
        <span ref={bottomRef} />
      </MenuContent>
      <IconRowWrapper>
        <Icon.Search />
        {isLandscape && <Icon.Gear />}
      </IconRowWrapper>
      {!isLandscape && (
        <SettingsWrapper>
          <Icon.Gear />
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

const ScrollDownButton = styled.button`
  ${props => !props.landscape && `display: none;`}
  border: 0;
  background: 0;
  position: fixed;
  z-index: 300;
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
  justify-content: space-evenly;
  position: fixed;
  background: #444;
  z-index: 2;
  top: 1rem;
  right: 3rem;
  left: 120px;
  
  svg {
    height: 24px;
    fill: #d4d4d4;
    padding: 0.5rem;
  }
`

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  background: #444;
  padding: 1rem 0;
  z-index: 2;
  bottom: 0;
  width: 100%;

  svg {
    height: 64px;
    fill: #d4d4d4;
  }
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
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  text-align: center;
  padding: 0.75rem;
  color: #fffff0 !important;
  box-sizing: border-box;

  font-size: 1.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items:center;
  line-height: 1;
  text-align: center;
  border: 2px solid transparent;
  font-variant: all-small-caps;

  &:last-of-type {
    color: #f9c959 !important;
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
