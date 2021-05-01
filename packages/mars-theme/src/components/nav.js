import { connect, styled } from "frontity"
import Link from "./link"
import { Icon } from "../components/theme"

const Nav = ({ state }) => {
  const sticky = state.theme.isHeaderSticky
  const { menu } = state.theme
  return (
    <NavContainer>
      {menu.map(([name, link]) => {
        // TODO: handle hash anchors in beforeSSR
        const isCurrentPage = state.router.link.split('#').shift() === link
        return (
          <NavItem key={name} sticky={sticky} aria-current={isCurrentPage ? "page" : undefined}>
            <Link link={link}>
              {name}
            </Link>
          </NavItem>
        )
      })}
    </NavContainer>
  )
}

export default connect(Nav)

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1.5rem;
  margin: 0;

  @media screen and (max-width: 959px) {
    display: none;
  }
`

const NavItem = styled.div`
  font-size: 18px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  
  &[aria-current="page"] a {
    border-bottom-color: #F9C959;

    svg {
      fill: #f9c959;
    }
  }

  .icon {
    border-radius: 50%;
    padding: 4px;
    margin: 0 2px;
    border-color: transparent !important;
    
    svg {
      height: 24px;
      fill: #444;
    }

    &[aria-label="Help"]:not(:hover) svg {
      fill: #444;
    }

    &[aria-label="Lang"] {
       div {
      background: #444;
      span {
        color: #d4d4d4;        
      }
    }

    :hover div {
      background: #f9c959;
    }
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

      svg {
        fill: #f9c959;
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }
`
