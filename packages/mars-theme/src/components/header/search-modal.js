import { useRef } from "react";
import { styled, css, connect } from "frontity";
import { Input, Form } from "reactstrap";
import Link from "../link";
import { CloseIcon } from "../theme";
import useSearch from "./useSearch";

const SearchModal = () => {
  const inputRef = useRef();
  const [results, term, setTerm, , toggle] = useSearch();

  return (
    <Wrapper>
      <Overlay onClick={toggle} />
      <Content>
        <Form>
          <Input
            innerRef={inputRef}
            autoFocus
            name="searchTerm"
            placeholder="I am searching for..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => {
              inputRef.current?.select();
            }}
            css={css`
              margin-bottom: 4rem;
            `}
          />
        </Form>
        {results.length ? (
          <ResultsWrapper>
            {results.map((item, index) => (
              <ResultItem key={index} delay={index} link={getUrl(item.url)}>
                <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </ResultItem>
            ))}
          </ResultsWrapper>
        ) : null}
        {results.length ? (
          <AllResultsButton link={`/search/${term}`}>
            See all results
          </AllResultsButton>
        ) : null}
      </Content>
      <CloseButton onClick={toggle}>
        <CloseIcon />
      </CloseButton>
    </Wrapper>
  );
};

export default connect(SearchModal);

const getUrl = (url) => {
  const i1 = url.indexOf("://");
  const i2 = url.indexOf("/", i1 + 3);
  return url.substr(i2);
};

const Overlay = styled.div`
  background-color: #444e;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  top: 100%;
  left: 0;
  z-index: -1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 12px;
  position: fixed;
  top: 4.5rem;
  right: 4rem;
  cursor: pointer;

  svg {
    height: 48px;
    width: 48px;
  }

  :hover svg {
    fill: #888;
  }
`;

const AllResultsButton = styled(Link)`
  margin: 1.75rem auto 3.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0.25rem;
  border-bottom: 2px solid #f9c959;

  :hover {
    text-decoration: none;
    color: #888;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fffff0;
  backdrop-filter: blur(4px);
  width: 100vw;
  // height: 100vh;
  position: fixed;
  top: 48px;
  left: 0;
  color: #444;
  box-shadow: 0 2px 4px #4444;
  border-top: 4px solid #4448;
`;

const ResultItem = styled(Link)`
  @keyframes pop {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  flex-basis: 288px;
  flex-shrink: 0;
  height: 240px;
  background: #f2eedd;
  border-radius: 6px;
  margin: 0 2rem 2rem 0;
  padding: 1rem;
  animation: pop 200ms ease-out
    ${(props) => (props.delay ? props.delay * 100 : 0)}ms backwards;

  :hover {
    background: #e2e2d2;
  }
`;

const ResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const Content = styled.div`
  padding: 1rem;
  height: calc(100vh - 56px);
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1088px;
  align-items: center;

  @media (min-width: 768px) {
    padding: 4rem 4rem 1rem;
  }
`;
