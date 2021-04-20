import React from 'react'
import { connect, styled, css } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import { Icon } from './theme'

const Header = ({ state }) => {
  const {
    isHeaderSticky: sticky,
    isMobileMenuOpen
  } = state.theme

  return (
    <Container sticky={sticky}>
      <Row>
        <LogoLink link="/" $hidden={sticky && !isMobileMenuOpen}>
          <Icon.Logo lighten={isMobileMenuOpen} />
        </LogoLink>
        <Nav />
      </Row>
      <MobileMenu />
    </Container>
  )
}

export default connect(Header)

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
  background: transparent;
  transition: background-color 600ms ease-out, color 600ms ease-out;
  color: ${props => props.sticky ? '#444' : '#fffff0'};

  @media (min-width: 960px) {
    background-color: #fffff011;
    backdrop-filter: blur(2px);
    ${props => props.sticky && `
    backdrop-filter: blur(2px) saturate(0.3) contrast(0.4) brightness(1.4);
    background-color: #fffff088;
    box-shadow: 0 2px 4px #444a;
    `}
  }
`

const LogoLink = styled(Link)`
  text-decoration: none;
  margin: 0.5rem 0.25rem;
  transition: opacity 300ms ease-out;
  z-index: 3;
  
  @media (min-width: 960px) {
    margin-left: 1rem;
  }
  
  @media (max-width: 767px) {
    margin: 1.25rem 0.75rem 0;
    ${props => props.$hidden && `
    pointer-events: none;
    opacity: 0;
    `}
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`