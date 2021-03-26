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
        <Description>{state.frontity.description}</Description>
        <MobileMenu />
      </Container>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  margin: 32px auto 0;
  max-width: 600px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`