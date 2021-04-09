import React, { useEffect } from 'react'
import { connect, styled } from "frontity"
import { scrollToAnchor } from '../helpers'

const Home = ({ state }) => {
  const { type, id } = state.source.get(state.router.link)
  const content = state.source[type][id].content.rendered

  return (
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default connect(Home);

const Container = styled.div`
  margin: 0;
  list-style: none;
  padding: 1rem 0;
  max-width: 960px;
  width: 100%;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin: 4rem 0 1rem;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: normal;
    margin-bottom: 0;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: normal;
    display: flex;

    & img {
      margin-left: 1rem;
    }
  }

  .cover img {
    object-fit: cover;
  }

  a {
    display: inline-block;
    font-size: 1.15rem;
    border-bottom: 2px solid #f9c959;

    &:hover {
      text-decoration: none;
      border-color: transparent;
      color: #f9c959;
    }
  }

  .clean-links a {
    padding: inherit;
    border: inherit;
  }

  .wp-block-columns {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .wp-block-column {
    margin: 2rem 1rem;
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
    padding: 0 1rem;

    a {
      font-size: inherit;
    }
  }

  .wp-block-image {
    margin: 0;
    overflow: hidden;
  }

  .wp-block-articles {
    p {
      max-width: 400px;
      margin-top: 0.5rem;
    }

    .wp-block-image {
      overflow: hidden;
      margin: 0;
  
      img {
        object-fit: cover;
        height: 300px;
        object-position: center;
        width: 288px;
      }
    }
  }

  @media (min-width: 768px) {
    h2 {
      margin: 8rem 0 6rem;
    }

    .wp-block-columns {
      flex-direction: row;
      margin: 4rem auto;
    }

    .wp-block-column {
      width: 100%;
      margin: 1rem;
      padding: 1rem;
    }

    .wp-block-articles {
      .wp-block-column {
        width: 50%;
        max-width: 50%;
      }

      .wp-block-image img {
        width: 400px;
      }
    }
  }
`