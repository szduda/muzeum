import { connect, styled, css } from "frontity";
import { H4 } from "../../html2react";
import FeaturedMedia from "../../featured-media";

export const Item = ({ state, post }) => {
  const excerpt = post.excerpt.rendered.match(/<p>(.+)<a/);
  const categories = post?.categories.map(
    (cat) => state.source.category[cat].name
  );
  return (
    <a
      key={post.slug}
      href={`/${post.slug}`}
      css={css`
        padding: 0 0 0.5rem;
        flex: 0.4 0 calc(50% - 4rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        background: #f0f0e0;
        border: 1px solid #4441;
        margin: 0 0 3rem;
        height: auto;
        height: fit-content;
        text-decoration: none;

        &:hover {
          text-decoration: none;
          opacity: 0.8;
        }

        @media (min-width: 768px) {
          margin: 0 2rem 4rem;
        }
      `}
    >
      <FeaturedMedia
        id={post.featured_media}
        css={css`
          width: 100%;
          height: 360px;
          object-fit: cover;
          background: #4444;
        `}
      />
      <div
        css={css`
          padding: 2rem 1rem 0;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {categories?.map((category) => (
          <span
            key={category}
            css={css`
              margin: 0 0.5rem 0.5rem 0;
              padding: 0.25rem 0.5rem;
              border-radius: 4px;
              background: #f9c959aa;
            `}
          >
            {category}
          </span>
        ))}
      </div>
      <H4
        css={css`
          width: 100%;
          padding: 0.5rem 1rem 1rem;
          box-sizing: border-box;
        `}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p
        dangerouslySetInnerHTML={{ __html: excerpt?.[1] }}
        css={css`
          padding: 0 1rem;
          font-size: 1rem;
        `}
      />
      <span
        css={css`
          align-self: flex-start;
          margin: 0 0 1rem 1rem;
          border-bottom: 2px solid #f9c959;
        `}
      >
        Read more
      </span>
    </a>
  );
};

export default connect(Item);
