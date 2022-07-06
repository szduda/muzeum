import React, { useRef, useEffect } from 'react'
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header/header";
import Footer from "./footer";
import Home from "./pages/home";
import List from "./pages/list/list";
import Post from "./pages/post";
import Loading from "./pages/loading";
import Title from "./header/title";
import PageError from "./pages/page-error";
import heroBackgroundUrl from '../assets/gate.jpg'
import { scrollToAnchor, useMousedown, useMediaQuery } from '../helpers'
import { useDebouncedCallback } from "use-debounce";
import faviconUrl from '../assets/favicon.png'
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, actions }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link)
  const isSticky = state.theme.isHeaderSticky
  const ref = useRef(null)

  const handleScroll = () => {
    if (ref.current) {
      if (ref.current.getBoundingClientRect().top <= 100)
        actions.theme.setSticky()
      else
        actions.theme.unsetSticky()
    }
  }
  const debouncedHandleScroll = useDebouncedCallback(handleScroll, 100)

  useEffect(() => {
    handleScroll()
    const root = document.querySelector('#root')
    root.addEventListener('scroll', debouncedHandleScroll)
    return () => root.removeEventListener('scroll', () => debouncedHandleScroll)
  }, [debouncedHandleScroll, state.router.link])

  const mousedown = useMousedown()
  const isLandscape = useMediaQuery('(max-height: 475px)');

  useEffect(() => {
    if (isLandscape)
      actions.theme.setLandscapeOrientation()
    else
      actions.theme.setPortraitOrientation()
  }, [isLandscape])


  const heroImageId = state.source?.[data.type]?.[data.id]?.featured_media || -1
  const bgUrl = state.source.attachment?.[heroImageId]?.source_url ?? heroBackgroundUrl

  return (
    <>
      <Title />
      <Head>
        <html lang="en" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content={state.frontity.description} />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/png" href={faviconUrl} />

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin="" />
        {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" type="text/javascript" async
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin="" />

        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>

      <Global styles={getGlobalStyles(bgUrl)} />

      <Wrapper className={[mousedown ? 'mousedown' : '', isLandscape ? 'landscape' : ''].join(' ')}>
        <Header sticky={isSticky} />
        {data.isPost || data.route === '/resources/' ? (
          <NoHero />
        ) : (
          <Hero fullHeight={data.isHome}>
            <Switch>
              <HomepageHero when={data.isHome} />
              <GenericHero when={data.route === '/arrival/'} title="how to get there" cta="entry" ctaId="entrances" />
              <GenericHero when={data.route === '/get-ready/'} title="prepare in advance" cta="on site" ctaId="on-site" />
              <GenericHero when={data.route === '/auschwitz-birkenau/'} title="visiting guide" cta="extras" ctaId="beyond" />
              <GenericHero when={data.route === '/surroundings/'} title="discover the vicinity" cta="nature" ctaId="nature" />
              <GenericHero when={data.route === '/tours/'} title="best ways to visit" cta="top pick" ctaId="organized" />
              <PageError when={data.isError} />
            </Switch>
          </Hero>
        )}
        {!data.isError && (
          <Main ref={ref}>
            <Switch>
              <Loading when={data.isFetching} />
              <Home when={
                data.isHome ||
                data.route === '/arrival/' ||
                data.route === '/get-ready/' ||
                data.route === '/auschwitz-birkenau/' ||
                data.route === '/surroundings/' ||
                data.route === '/tours/' ||
                data.route === '/4-copy/'
              } />
              <List when={data.isArchive} />
              <Post />
            </Switch>
          </Main>
        )}

        <Footer />
      </Wrapper>
    </>
  );
};

export default connect(Theme);

const getGlobalStyles = bgUrl => css`
  html {
    scroll-behavior: smooth;
    height: 100vh;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: linear-gradient(to bottom, #654a, #444), url('${bgUrl}') center 0px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    color: #444;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    
    // @media (min-width: 960px) {
    //   background-attachment: fixed;
    // }
  }

  a, a:visited {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a, button {
    -webkit-tap-highlight-color: #f9c95944;
  }


  button:focus, a:focus {
    outline: 2px solid #f9c959;
  }
  .mousedown {
    a:focus, button:focus {
      outline: none;
    }
  }

  div {
    box-sizing: border-box;
  }

  div#root {
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 0 0 2rem;
  }

  img {
    width: auto;
  }

  form {
    display: flex;
  }

  input {
    font-size: 2rem;
    padding: 0.25rem;
    margin: 1rem;
    border: none;
    background: #fffff0;
    border-bottom: 4px solid #f9c959;
    color: #fffff0;

    :focus {
      outline: 2px solid #f9c959;
    }

    @media (min-width: 768px) {
      padding: 1rem;
      margin: 0;
      color: #444;
    }
  }

  ul, ol {
    margin: 0 0 2rem;
    line-height: 1.5;
    padding-left: 2.5rem;
    font-size: 1.25rem;

    li {
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
  }

  .has-text-align-center {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  
  figure.icon, .icon figure {
    height: 128px;
    width: 128px;
  }

   div.icon, figure.icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure.icon a {
    width: 100%;
    height: 100%;
    border: none! important;
  }

  .aligncenter {
    align-self: center;
  }

  .wp-block-image:not(.icon) img {
    max-width: 100%;
  }

  figure.icon-64, .icon-64 figure {
    height: 64px;
    width: 64px;
  }

  .inverted {
    background: #444;
    color: #fffffa;
    padding: 4rem 0;

    @media (min-width: 960px) {
      margin: 0 calc(-50vw + 480px);
      padding: 4rem calc(50vw - 480px);
    }
  }

  .no-margin {
    margin: 0 !important;
  }

  .no-margin-top {
    margin-top: 0 !important;
  }

  .no-margin-bottom {
    margin-top: 0 !important;
  }

  .hide-on-mobile {
    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  min-height: 80vh;
  background: #fffff0;
  box-shadow: 0 0 24px 16px #444;
  background: #fffff0;
`;

const Hero = styled.div`
  padding: 0 1rem;
  min-height: calc(100vh - 52px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  h2 {
    display: flex;
    margin: 0 0 2rem 0;
    align-self: flex-end;
    font-size: 3.5rem;
    line-height: 0.8;
    flex-direction: column;
    color: #fffff0;
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
    min-height: 50vh;
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
    {cta && ctaId && (
      <CTA onClick={() => scrollToAnchor(`#${ctaId}`)}>
        <span>{cta}</span>
      </CTA>
    )}
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

const NoHero = styled.div`
  height: 48px;
  background: #fffff0;
  width: 100%;
  margin-top: -48px;
  z-index: 1;
`

export const CTA = styled.button`
  align-self: flex-end;
  border: 2px solid #f9c959;
  border-radius: 6px;
  color: #444;
  background: #f9c959;
  font-size: 1.5rem;
  padding: 0.25rem 1rem;
  text-transform: lowercase;
  margin: 0 0 8rem;
  cursor: pointer;
  box-shadow: 0 0px 12px #f9c95922;
  font-variant: all-small-caps;
  line-height: 1.5;
  font-weight: 600;
	min-width: 150px;
	display: block;
	vertical-align: middle;
	position: relative;
	z-index: 1;
  transition: color 300ms, background-color 300ms;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

  :focus {
	  outline-offset: 12px;
  }

  > span {
	  vertical-align: middle;
    transform: translateY(-2px);
    display: inline-block;
  }

  :hover {
    background-color: #444d;
    color: #f9c959;
  }

  @media(min-width: 768px) {
    align-self: center;
  }
`
