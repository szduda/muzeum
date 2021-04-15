import { styled, connect } from "frontity";
import Link from "./link";

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
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
      </MenuContent>
    </>
  );
};

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
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  text-align: center;
  padding: 1rem;
  color: #fffff0 !important;

  font-size: 2rem;
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

  &:hover,
  &:focus {
    background-color: #f9c959;
    text-decoration: none;
  }

  &[aria-current="page"] {
    background-color: #888;
  }
`;

export default connect(MenuModal);
