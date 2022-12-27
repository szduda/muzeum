import { connect, styled, Global, loadable } from "frontity";
import { SearchIcon } from "../theme";
import { useMediaQuery, getBodyLockStyle } from "../../helpers";
import FocusTrap from "focus-trap-react";

const SearchModal = loadable(() => import("./search-modal"));

const Search = ({ state, actions }) => {
  const {
    search: { open },
    isMobileMenuOpen,
  } = state.theme;
  const isWideScreen = useMediaQuery("(min-width: 768px)");

  return (
    <FocusTrap
      active={open && !isMobileMenuOpen}
      initialFocus={"#search-toggle"}
    >
      <SearchWrapper>
        {open && (
          <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />
        )}
        {open && <SearchModal />}
        <SearchToggle
          onClick={actions.theme.search.toggle}
          id={"search-toggle"}
        >
          <SearchIcon color={open ? "#f9c959" : "#444"} />
        </SearchToggle>
      </SearchWrapper>
    </FocusTrap>
  );
};

export default connect(Search);

const SearchToggle = styled.button`
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  margin: 0 2px;
  border-color: transparent !important;

  :hover svg {
    fill: #f9c959;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
`;
