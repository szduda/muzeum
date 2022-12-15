import { styled, connect, Global, loadable } from "frontity";
import { HamburgerIcon } from "./menu-icon";

const MenuModal = loadable(() => import('./menu-modal'))

function MobileMenu({ state, actions }) {
  const { isMobileMenuOpen, isHeaderSticky: sticky } = state.theme;
  return (
    <>
      <MenuToggle sticky={sticky} isOpen={isMobileMenuOpen} onClick={actions.theme.toggleMobileMenu}>
        {isMobileMenuOpen && (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
          </>
        )}
        <HamburgerIcon color="#444" size="24px" open={isMobileMenuOpen} />
      </MenuToggle>
      {isMobileMenuOpen && <MenuModal />}
    </>
  );
}

const MenuToggle = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  transition: top 300ms ease-out;
  // padding: 1.25rem 1rem;
  padding: 0.75rem;
  margin: 0.5rem;
  border-radius: 8px;
  ${props => !props.isOpen && `transition: background-color 300ms ease-out 150ms;`}
  background-color: ${props => props.sticky && !props.isOpen ? '#fffff0' : 'transparent'};
  border: 0;
  color: white;
  z-index: 5;
  display: none;

  @media (max-width: 959px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default connect(MobileMenu);
