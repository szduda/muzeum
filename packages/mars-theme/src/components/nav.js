import { connect, styled } from "frontity"
import Link from "./link"
import { Icon } from "../components/theme"

const Nav = ({ state, sticky }) => (
  <NavContainer>
    {state.theme.menu.map(([name, link, icon]) => {
      const isCurrentPage = state.router.link === link
      return (
        <NavItem key={name} sticky={sticky} aria-current={isCurrentPage ? "page" : undefined}>
          <Link className={icon ? 'icon' : ''} link={link}>
            {icon
              ? '?'
              : name
            }
          </Link>
        </NavItem>
      )
    })}
  </NavContainer>
)

export default connect(Nav)

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
`

const NavItem = styled.div`
  font-size: 18px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  
  &[aria-current="page"] {
    ${({ sticky }) => sticky && `
    background: #444;
    color: #fffff0;
  `};
  }

  .icon {
    border-radius: 50%;
    background-color: #444;
    padding: 1px 8px 4px;
    ${({ sticky }) => sticky && `color: #fffff0;`}

    :hover {
      background-color: #654;
      border-color: transparent;
    }
  }
  
  & > a {
    padding: 6px 8px;
    margin: 0 8px;
    font-weight: 600;
    display: inline-flex;
    align-items:center;
    line-height: 1;
    text-align: center;
    border: 2px solid transparent;
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

    a {
      border-radius: 8px;
      border: 2px solid #f9c959;
      color: #f9c959;
      ${({ sticky }) => sticky ? `
      :not(:hover) {
        color: #654;
        border-color: #654;
      }
      ` : `
      :hover {
        border-color: #654;
        color: #654;
      }
      `}
    }
  }
`
