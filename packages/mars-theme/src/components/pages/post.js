import { useEffect } from "react";
import { connect, styled, Global, css } from "frontity";
import Link from "../link";
import List from "./list";
import FeaturedMedia from "../featured-media";
import postStyle from './post.css';

const Post = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const author = state.source.author[post.author];
  const date = new Date(post.date);

  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);

  return data.isReady ? (
    <Col>
      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}
      <Container hasFeaturedImage={!!post.featured_media}>
        <Global styles={css(postStyle)} />
        <div>
          <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {data.isPost && (
            <div>
              {author && (
                <StyledLink link={author.link}>
                  <Author>
                    By <b>{author.name}</b>
                  </Author>
                </StyledLink>
              )}
              <DateWrapper>
                {" "}
                on <b>{date.toDateString()}</b>
              </DateWrapper>
            </div>
          )}
        </div>

        <Content>
          <Html2React html={post.content.rendered} />
        </Content>
      </Container>
    </Col>
  ) : null;
};

export default connect(Post);

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  margin: 0;
  padding: 1rem;
  max-width: 960px;

  ${props => !props.hasFeaturedImage && `padding-top: 8rem;`}
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);

  @media(min-width: 768px) {
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p, h1, h2, h3 {
    max-width: 800px;
    text-align: left;
  }

  h2 {
    margin: 4rem 0 2rem;
    font-size: 2rem;
    padding-top: 0;
  }

  p {
    line-height: 1.7rem;
    margin: 2rem 0;
  }

  ul {
    margin: 2rem 0;
    line-height: 1.7;
    padding-left: 1rem;
  }

  >.wp-block-image {
    margin: 4rem 0;
  }

  >.wp-block-embed.is-type-video {
    margin: 4rem 0;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 0;
    /* next line overrides an inline style of the figure element. */
    // width: 100% !important;
    // max-height: 50vh;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 2rem 0;
    box-sizing: border-box;
    background-color: #f2eedd;
    border-left: 4px solid #888;
    padding: 1rem;
    font-size: 1.25rem;

    cite {
      font-style: normal;
      color: #888;
    }
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }

  .wp-block-columns {
    margin-bottom: 0;
  }
`;
