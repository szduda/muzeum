import React, { createContext, useContext } from "react";
import { connect, loadable, styled } from "frontity";

const RecentPosts = loadable(() => import("../recent-posts"));
const Map = loadable(() => import("../map/map"));

export const OpeningHoursContext = createContext(null);
export const useOpeningHours = () => useContext(OpeningHoursContext);

const Home = ({ state, libraries }) => {
  const { type, id, isHome } = state.source.get(state.router.link);
  const page = state?.source?.[type]?.[id];
  const Html2React = libraries.html2react.Component;

  let openingHoursData = null;
  if (page?.openingHours) {
    try {
      openingHoursData = JSON.parse(page?.openingHours);
    } catch (error) {
      console.log("JSON ERRROR\n", error);
    }
  }

  const _HTML = <Html2React html={page?.content.rendered} />;

  const HTML = openingHoursData ? (
    <OpeningHoursContext.Provider value={openingHoursData}>
      {_HTML}
    </OpeningHoursContext.Provider>
  ) : (
    _HTML
  );

  return (
    <Container>
      {HTML}
      {isHome && <RecentPosts posts={page?.recentPosts} />}
      {state.theme.isHeaderSticky && <Map />}
    </Container>
  );
};

export default connect(Home);

const Container = styled.div`
  margin: 0;
  list-style: none;
  padding: 1rem 0 4rem;
  max-width: 960px;
  width: 100%;

  > h2:first-of-type {
    margin-bottom: 2rem;
  }

  .has-medium-font-size {
    font-size: 20px;
  }

  #prepare {
    color: white;
    background: #444;
    padding: 0 1rem 4rem; 

    @media (min-width: 768px) {
      margin: 8rem calc(-50vw + 480px) 0;
      padding: 2rem calc(50vw - 480px);
    }

    h3 {
      opacity: 0.3;
    }
  }

  #means-of-transport {
    .wp-block-image {
      height: 128px;
      width: 128px;
      margin: 0;
    }

    .wp-block-column {
      flex-basis: 128px;
    }

    &.wp-block-columns {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
    }

    h4 {
      padding-top: 0;
    }
  }

  #opening-hours {
    background: #f2eedd;
    margin-top: 2rem;
    overflow: hidden;

    sub {
      color: #888;
      font-size: 1rem;
      font-weight: 600;
      vertical-align: baseline;
      font-variant: all-small-caps;
      display: inline-block;
      
      &:nth-of-type(n+2) {
        padding-top: 1rem;
      }
    }

    p:first-of-type {
      margin-top: 0;

      br {
        margin-bottom: 0.5rem;
      }
    }

    @media (min-width: 960px) {
      margin: 0 calc(-50vw + 480px);
      
      > div {
        max-width: 960px;
        margin: 0 auto;
        padding 0 16px;
      }
    }
  }

  .cover img {
    object-fit: cover;
  }

  .clean-links a {
    padding: unset;
    border: unset;
  }

  .wp-block-columns {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
      margin: 0 auto;
    }
  }

  #key-info {
    .wp-block-image {
      height: 64px;
      width: 64px;
    }

    p {
      z-index: 1;
      
      a {
        text-decoration: none;
        display: block;
        margin-top: -170px;
        padding-top: 170px;
      }

      a:visited, a:hover {
        text-decoration: none;
      }
    }
  }

  .wp-block-column {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      width: 100%;
      margin: 0 1rem;
      padding: 0 1rem;
    }
  }

  .wp-block-narrow-text {
    padding: 0 1rem;
    max-width: min(100%, 640px);
    margin: 4rem auto;

    @media (min-width: 768px) {
      text-align: center;
    }
  }

  .single-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .wp-block-image {
    margin: 0;
  }

  .shadow img {
    box-shadow: 0 0 8px 0 #0008;
  }

  .wp-block-articles {
    p {
      max-width: 400px;
      margin-top: 0.5rem;
    }

    .wp-block-image img {
      box-shadow: 0 2px 4px #444a;
      object-fit: cover;
      // height: 300px;
      object-position: center;
      width: 100%;
    }

    @media (min-width: 768px) {
      .wp-block-column {
        width: 50%;
        max-width: 50%;
      }
    }
  }

  .wp-block-button {
    display: flex;

    a {
      margin: 2rem auto;
      font-size: 24px;
    }

    @media (min-width: 768px) {
      font-size: 32px;
      a {
        margin: 0 auto 2rem;
      }

      &.align-left a {
        margin: 2rem 0;
      }
    }
  }

  #mission {
    position: relative;
    padding: 0 max(calc(50vw - 50%), 1rem);
    background: #423628;
    color: #fffffe;
    margin: 0 calc(-50vw + 50%);
    overflow: hidden;
    min-height: 67vh;
    font-size: 1.25rem;
    display: flex;
    align-items: center;

    .quote {
      max-width: 480px;
      text-align: right;
      margin: 0 0 2rem auto;
      font-size: 1rem;
    }

    @media (max-width: 767px) {
      .wp-block-columns {
        flex-direction: column;
      }

      .wp-block-column {
        margin: 0 1rem;
      }
    }
  }

  #bigQuote {
    min-height: 80vh;
    padding: 0 1rem 2rem;
    font-size: 2rem;
    line-height: 1.5;
    letter-spacing: 2px;
    display: flex;
    align-items: center;

    
    h4 {
      max-width: 520px;
    }

    @media (min-width: 768px) {
      padding: 0 4rem 8rem;
    }
  }

  @media (min-width: 768px) {
    padding: 1rem 0 0;
  }
`;
