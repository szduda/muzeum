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
  z-index: 10;

  :before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: min(50vh, 14rem);
    z-index: -1;
    background: linear-gradient(to bottom, #fcfcfc 32px, transparent);
    opacity: 1;
    transition: opacity 1s ease-out 450ms;
    pointer-events: none;
  }

  transition: background-color 300ms ease-out 150ms;
  background-color: transparent;
  ${props => props.sticky && `
  transition-delay: 0;
  background-color: #fcfcfc;
  box-shadow: 0 2px 4px #444a;
  :before {
    opacity: 0;
  }
  `}
`


const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 6px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`