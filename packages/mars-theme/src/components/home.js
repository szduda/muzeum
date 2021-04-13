import React from 'react'
import { connect, styled } from "frontity"

const Home = ({ state, libraries }) => {
  const { type, id } = state.source.get(state.router.link)
  const content = state.source[type][id].content.rendered
  const Html2React = libraries.html2react.Component;

  return (
    <Container>
      <Html2React html={content} />
    </Container>
  )
}

export default connect(Home);

const Container = styled.div`
  margin: 0;
  list-style: none;
  padding: 1rem 0 8rem;
  max-width: 960px;
  width: 100%;

  > h2:first-of-type {
    margin-bottom: 2rem;
  }

  .has-medium-font-size {
    font-size: 20px;
  }

  .means-of-transport {
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
      margin: 0 calc(-50vw + 480px) -2rem;
      
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
      margin: 4rem auto;
    }
  }

  #key-info {
    .wp-block-image {
      height: 64px;
      width: 64px;
    }
  }

  .wp-block-column {
    margin: 2rem 1rem;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      width: 100%;
      margin: 1rem;
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
    margin: 0 0 1rem;
    overflow: hidden;
  }

  .shadow {
    box-shadow: 0 2px 4px #444a;
  }

  .wp-block-articles {
    p {
      max-width: 400px;
      margin-top: 0.5rem;
    }

    .wp-block-image {
      box-shadow: 0 2px 4px #444a;
  
      img {
        object-fit: cover;
        height: 300px;
        object-position: center;
        width: 100%;
      }
    }

    @media (min-width: 768px) {
      .wp-block-column {
        width: 50%;
        max-width: 50%;
      }

      .wp-block-image img {
        width: 416px;
      }
    }
  }
`