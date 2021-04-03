import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import bgLeftUrl from '../assets/bg.jpg'
import bgRightUrl from '../assets/bg2.jpg'

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      <Global styles={globalStyles} />

      <Wrapper>
        <Header />
        <Hero>
          <h2>
            <small>How to visit</small>
            <span css={css`@media(min-width: 768px) { display: none }`}>Auschwitz Birkenau</span>
            <span css={css`@media(max-width: 767px) { display: none }`}>Auschwitz-Birkenau</span>
            <small>memorial &amp; museum</small>
          </h2>

        </Hero>
        <Main>
          <Switch>
            <Loading when={data.isFetching} />
            <List when={data.isArchive} />
            <Post when={data.isPostType} />
            <PageError when={data.isError} />
          </Switch>
        </Main>

        {/* <Footer /> */}
      </Wrapper>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: linear-gradient(to bottom, #f9c95988, #444), url('${bgLeftUrl}');
    background-size: auto 100vh;
    background-position: -50vw 0;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    color: #444;
  }

  a, a:visited {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  div {
    box-sizing: border-box;
  }

  div#root {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  min-height: 100vh;
  margin-bottom: 400px;
  background: linear-gradient(to bottom, #fcfcfc 72px, transparent 40vh);
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 80vh;
  background: #fcfcfc;
  box-shadow: 0 2px 12px 4px;
  background-image: linear-gradient(
    180deg,
    #F9C95911,
    #fcfcfc
  );
`;

const Hero = styled.div`
  padding: 16px;
  max-width: 960px;
  height: 71vh;
  width: 100%;
  display: flex;
  
  h2 {
    display: flex;
    font-size: 4rem;
    line-height: 0.6;
    flex-direction: column;
    color: #fcfcfc;
    position: relative;
    font-variant: all-small-caps;
    text-shadow: 0 2px 4px #543a;
    text-align: right;

    span {
      padding-bottom: 12px;
    }

    small {
      font-size: 1.5rem;
      line-height: 1.75;
      font-variant: normal;
      text-transform: lowercase;
    }

  }

  @media(min-width: 768px) {
    justify-content: center;
    padding: 120px 16px 64px;

    h2 {
      text-align: center;
    }
  }

  @media(min-width: 1400px) {
    max-width: 1288px;
  }
`;
