import { useRef } from 'react'
import { styled, connect } from "frontity";
import Link from "./link";
import { Icon } from './theme'

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  const textItems = menu.filter(([, , icon]) => !!!icon)
  const iconItems = menu.filter(([, , icon]) => !!icon)

  const bottomRef = useRef()

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        <MenuLink link="/">Home</MenuLink>
        {isThereLinks &&
          textItems.map(([name, link]) => (
            <MenuLink
              key={name}
              link={link}
              aria-current={state.router.link === link ? "page" : undefined}
            >
              {name}
            </MenuLink>
          ))}
        <IconRow icons={iconItems} />
        <span ref={bottomRef} />
      </MenuContent>
      <ScrollDownButton onClick={() => bottomRef.current.scrollIntoView({ behavior: 'smooth' })}>
        <Icon.Arrow angle={180} />
      </ScrollDownButton>
    </>
  );
};

const ScrollDownButton = styled.button`
  border: 0;
  background: 0;
  position: fixed;
  z-index: 300;
  right: 0.75rem;
  bottom: 6rem;

  svg {
    height: 32px;
    fill: #afafaf;
  }
`

const IconRow = ({ icons }) => (
  <IconRowWrapper>
    {icons.map(([name, link, icon]) => {
      const CurrentIcon = Icon[icon]
      return <CurrentIcon key={name} />
    })}
  </IconRowWrapper>
)

const IconRowWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #444;

  > * {
    height: 40px;
    width: 40px;
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
  padding: 72px 0;
  overflow-y: scroll;
  height: calc(100vh - 52px);
  box-sizing: border-box;
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  text-align: center;
  padding: 1rem;
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
