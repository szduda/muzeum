import { connect, styled, css, Head } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <>
      <Head>
        <meta
          name="canonical"
          content={`https://visitauschwitz.info${state.router.link}`}
        />
      </Head>
      <Container>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2rem 0;

            @media (min-width: 1024px) {
              margin: 2rem -2rem;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin: 0 0 2rem;
              flex-direction: column;
              width: 100%;

              @media (min-width: 768px) {
                flex-direction: row;
                flex-wrap: wrap;
              }
            `}
          >
            {data.items.map(({ type, id }) => {
              const item = state.source[type][id];

              return <Item key={item.id} post={item} />;
            })}
            <Pagination />
          </div>
        </div>
      </Container>
    </>
  );
};

export default connect(List);

const Container = styled.section`
  margin: 0;
  list-style: none;
  padding: 1rem 0 4rem;
  max-width: 960px;
  width: 100%;
`;
