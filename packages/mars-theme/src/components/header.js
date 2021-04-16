import React from 'react'
import { connect, styled, css } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import Logo from './logo'

const Header = ({ sticky = false }) => (
  <Container sticky={sticky}>
    <Row>
      <StyledLink link="/">
        <Logo sticky={sticky} />
      </StyledLink>
      <Nav sticky={sticky} />
    </Row>
    <MobileMenu sticky={sticky} />
  </Container>
)

// Connect the Header component to get access to the `state` in it's `props`
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

  @media (min-width: 768px) {
    background-color: #fffff011;
    backdrop-filter: blur(2px);
    ${props => props.sticky && `
    backdrop-filter: blur(2px) saturate(0.3) contrast(0.4) brightness(1.4);
    background-color: #fffff088;
    box-shadow: 0 2px 4px #444a;
    `}
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 6px;
  @media (min-width: 768px) {
    margin-left: 16px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`