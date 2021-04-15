import { styled, connect, Global } from "frontity";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";

function MobileMenu({ sticky, state, actions }) {
  const { isMobileMenuOpen } = state.theme;
  return (
    <>
      <MenuToggle sticky={sticky} onClick={actions.theme.toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon color="white" size="20px" />
          </>
        ) : (
          <HamburgerIcon color="#444" size="24px" />
        )}
      </MenuToggle>
      {/* If the menu is open, render the menu modal */}
      {isMobileMenuOpen && <MenuModal />}
    </>
  );
}

const MenuToggle = styled.button`
  position: absolute;
  right: 0.5rem;
  transition: top 300ms ease-out;
  top: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 300ms ease-out 150ms;
  background-color: ${props => props.sticky ? '#fffff0' : 'transparent'};
  border: 0;
  color: white;
  z-index: 5;
  height: 40px;
  width: 40px;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default connect(MobileMenu);
