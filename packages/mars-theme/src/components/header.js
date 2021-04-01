import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import Logo from './logo'

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <Row>
          <StyledLink link="/">
            <Logo />
          </StyledLink>
          <Nav />
        </Row>
        <MobileMenu />
      </Container>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 4px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`