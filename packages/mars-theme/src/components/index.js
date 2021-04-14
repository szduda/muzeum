import React, { useState, useRef, useEffect } from 'react'
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import Home from "./home";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import bgUrl from '../assets/gate.jpg'
import { scrollToAnchor } from '../helpers'

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link)

  const [isSticky, setSticky] = useState(false)
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 42)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', () => handleScroll)
  }, [ref])

  return (
    <>
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      <Global styles={globalStyles} />

      <Wrapper>
        <Header sticky={isSticky} />
        <Hero fullHeight={data.isHome}>
          <Switch>
            <HomepageHero when={data.isHome} />
            <GenericHero when={data.route === '/arrival/'} title="Arrival" cta="match my ride" ctaId="Find the best transport" />
          </Switch>
        </Hero>
        <Main ref={ref}>
          <Switch>
            <Loading when={data.isFetching} />
            <Home when={data.isHome || data.route === '/arrival/'} />
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
  html {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: linear-gradient(to bottom, #543a, #444), url('${bgUrl}') center 0px;
    background-size: cover;
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

  p {
    line-height: 1.5;
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
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  min-height: 80vh;
  background: #fcfcfc;
  box-shadow: 0 0 24px 16px #444;
  background-image: linear-gradient(
    180deg,
    #F9C95911,
    #fcfcfc
  );
`;

const Hero = styled.div`
  padding: 0 1rem;
  min-height: calc(100vh - 48px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  h2 {
    display: flex;
    margin: 0 0 2rem 0;
    align-self: flex-end;
    font-size: 3.5rem;
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
    min-height: 55vh;
    justify-content: center;
    ${props => props.fullHeight && 'height: 100vh;'}

    h2 {
      text-align: center;
      font-size: 4rem;
      align-self: center;
      margin: 72px;
    }
  }
`;

const GenericHero = ({ title, cta, ctaId }) => (
  <>
    <h2>
      {title}
    </h2>
    <CTA onClick={() => scrollToAnchor(`#${ctaId}`)}>
      <span>{cta}</span>
    </CTA>
  </>
)

const HomepageHero = () => (
  <>
    <h2>
      <small>How to visit</small>
      <span css={css`@media(min-width: 768px) { display: none }`}>Auschwitz Birkenau</span>
      <span css={css`@media(max-width: 767px) { display: none }`}>Auschwitz-Birkenau</span>
      <small>memorial &amp; museum</small>
    </h2>
    <CTA onClick={() => scrollToAnchor('#key-info')}>
      <span>key info</span>
    </CTA>
  </>
)

export const CTA = styled.button`
  align-self: flex-end;
  border-color: #f9c959;
  border-radius: 2rem;
  color: #f9c959;
  font-size: 1.5rem;
  padding: 0.25rem 1rem;
  text-transform: lowercase;
  margin: 0 0.25rem 6rem;
  cursor: pointer;
  box-shadow: 0 0px 12px #f9c95966;
  font-variant: all-small-caps;
  line-height: 1.5;
  font-weight: 600;

	min-width: 150px;
	display: block;
	border: none;
	background: none;
	vertical-align: middle;
	position: relative;
	z-index: 1;
  transition: color 300ms;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

  &:focus {
	  outline: none;
  }

  & > span {
	  vertical-align: middle;
    transform: translateY(-2px);
    display: inline-block;
  }

  &::before, &::after {
    content: '';	
    position: absolute;
    border-radius: inherit;	
    z-index: -1;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  &::before {
    top: -4px;	
    bottom: -4px;
    left: -4px;	
    right: -4px;
    transform: scale3d(0.7, 1, 1);
    transition: transform 300ms, opacity 300ms;
    background-color: #f9c959;
  }

  &::after {
    top: 0;	
    left: 0;
    width: 100%;	
    height: 100%;
    transform: scale3d(1.1, 1, 1);
    transition: transform 300ms, background-color 300ms;
    background: #444;
  }

  &:hover {
    &::before {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }

    &::after {
      transform: scale3d(1, 1, 1);
      background-color: #444;
    }
  }

  @media(min-width: 768px) {
    align-self: center;
  }
`
