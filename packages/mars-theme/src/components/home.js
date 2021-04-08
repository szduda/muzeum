import React from 'react'
import { connect, styled } from "frontity"

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
  }

  .wp-block-columns {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 4rem auto;
  }

  .wp-block-column {
    margin: 1rem;
  }

  .wp-block-image {
    margin: 0;
  }

  .wp-block-articles {
    p {
      max-width: 400px;
    }

    .wp-block-image {
      overflow: hidden;
      margin: 0;
  
      img {
        object-fit: cover;
        height: 300px;
        width: 400px;
      }
    }
  }

  @media (min-width: 768px) {
    .wp-block-columns {
      flex-direction: row;
    }

    .wp-block-column {
      width: 100%;
      padding: 1rem;
    }

    .wp-block-articles {
      .wp-block-column {
        width: 50%;
        max-width: 50%;
      }
    }
  }
`

const Section = styled.section`
  background: #d4d4d4;
`