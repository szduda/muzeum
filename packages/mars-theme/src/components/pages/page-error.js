import { styled, connect } from "frontity";

const description404 = (
  <>
    That page can’t be found{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
  </>
);

const description = (
  <>
    Don&apos;t panic! Seems like you encountered an error. If this persists,
    <a href="https://community.frontity.org"> let us know </a> or try refreshing
    your browser.
  </>
);

// The 404 page component
const Page404 = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Oops! Something went wrong";
  const title404 = "Oops! 404";

  return (
    <Container>
      <Title>{data.is404 ? title404 : title}</Title>
      <Description>{data.is404 ? description404 : description}</Description>
    </Container>
  );
};

export default connect(Page404);

const Container = styled.div`
  margin: 0;
  padding: 2rem 1rem 8rem;
  text-align: center;
  color: #fffff0;
`;

const Title = styled.h1`
  margin: 0;
  margin: 4rem 0;
  font-size: 4em;
`;

const Description = styled.div`
  line-height: 1.6em;
  margin: 4rem 0 2rem;
`;
