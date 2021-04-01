import { connect, styled } from "frontity";
import Link from "./link";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <NavContainer>
    {state.theme.menu.map(([name, link]) => {
      // Check if the link matched the current page url
      const isCurrentPage = state.router.link === link;
      return (
        <NavItem key={name} aria-current={isCurrentPage ? "page" : undefined}>
          <Link link={link}>
            {name}
          </Link>
        </NavItem>
      );
    })}
  </NavContainer>
);

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 0 0 24px;
  margin: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  font-size: 18px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  padding: 0 16px;

  &[aria-current="page"] {
    background: #444;
    color: #F9C959;
    border-bottom: 4px solid #f9c959;

    & > a:hover {
      border-bottom-color: transparent !important;
    }
  }
  
  & > a {
    font-weight: 600;
    display: inline-flex;
    align-items:center;
    padding: 0;
    line-height: 1;
    text-align: center;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    font-variant: all-small-caps;

    &:hover {
      text-decoration: none;
      border-bottom-color: #F9C959;
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 16px;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;
