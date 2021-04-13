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
export default connect(Header);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fcfcfc;
  ${props => props.sticky && `
    border-bottom: 2px solid #888;
  `}
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 6px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`