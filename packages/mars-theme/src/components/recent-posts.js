import { css } from "frontity";
import { Anchor } from "./html2react";
import { H2, H4 } from "./headings";
import Image from "@frontity/components/image";

export const RecentPosts = ({ posts = [] }) => (
  <>
    <H2>Latest news</H2>
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 4rem 0 1rem;

        @media (min-width: 768px) {
          margin: 6rem 0 8rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin: 0 0 2rem;
          flex-direction: column;

          @media (min-width: 768px) {
            flex-direction: row;
          }
        `}
      >
        {posts.map(({ title, slug, categories, thumbnailUrl, excerpt }) => (
          <a
            key={slug}
            href={`/${slug}`}
            css={css`
              padding: 0 0 0.5rem;
              flex: 0 0 calc(50% - 4rem);
              display: flex;
              flex-direction: column;
              align-items: center;
              box-sizing: border-box;
              background: #f0f0e0;
              border: 1px solid #4441;
              margin: 0 0 3rem;
              text-decoration: none;

              &:hover {
                text-decoration: none;
                opacity: 0.8;
              }

              @media (min-width: 768px) {
                margin: 0 2rem 2rem;
              }
            `}
          >
            <Image
              src={thumbnailUrl || ""}
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
              `}
            >
              {categories?.map((category) => (
                <span
                  key={category}
                  css={css`
                    margin-right: 1rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 8px;
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
                padding: 1rem 1rem;
                box-sizing: border-box;
              `}
            >
              {title}
            </H4>
            <p
              dangerouslySetInnerHTML={{ __html: excerpt.match(/(.+)<a/)?.[1] }}
              css={css`
                padding: 0 1rem;
                font-size: 1rem;
                margin: 0 0 1rem;
              `}
            />
          </a>
        ))}
      </div>
      <Anchor
        href="/articles"
        css={css`
          font-size: 1.5rem;
          padding: 0 0 0.5rem;
        `}
      >
        Read more posts
      </Anchor>
    </div>
  </>
);

export default RecentPosts;
