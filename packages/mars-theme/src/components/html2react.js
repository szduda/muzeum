import { styled, css } from "frontity";
import Slider from "react-slick";

export const init = ({ libraries }) => {
  elements.map(([tag, component]) => {
    const entry = createEntry(tag, component);
    libraries.html2react.processors.push(entry);
  });

  const carouselEntry = createEntry(
    ({ node }) =>
      node.component === "div" && node.props.className?.includes("carousel"),
    null,
    ({ node }) => {
      node.component = Carousel;
      node.children = node.children[0].children;
      return node;
    }
  );

  const stepsEntry = createEntry(
    ({ node }) =>
      node.component === "ol" &&
      node.props.className?.includes("steps-section"),
    null,
    ({ node }) => {
      node.component = Steps;
      return node;
    }
  );

  const tocEntry = createEntry(
    ({ node }) =>
      node.component === "div" &&
      node.props.className?.includes("table-of-contents"),
    null,
    ({ node }) => {
      node.component = TableOfContents;
      node.children = node.children[0].children;
      return node;
    }
  );

  libraries.html2react.processors.push(carouselEntry);
  libraries.html2react.processors.push(stepsEntry);
  // libraries.html2react.processors.push(tocEntry)
};

export default init;

export const TableOfContents = ({ children }) => {
  const table = children[0];
  const contents = children[1];
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          position: sticky;
          display: flex;
          flex: 30% 0 0;
        `}
      >
        {table}
      </div>
      <div
        css={css`
          display: flex;
          flex: 70% 1 0;
        `}
      >
        {contents}
      </div>
    </div>
  );
};

export const Steps = ({ children }) => (
  <ol
    css={css`
      list-style: none;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 1.5;

      @media (min-width: 768px) {
        flex-direction: row;
        margin: 0 -0.5rem;
      }
    `}
  >
    {children?.map((element, index) => (
      <div
        key={index}
        css={css`
          position: relative;
          margin: 0 2rem 2rem;
          padding: 0;

          @media (min-width: 768px) {
            margin: 0;
            padding: 1rem 1rem 2rem;
            flex: 1 0 200px;
            border-bottom: 1px solid #4444;

            ::after {
              content: "";
              background: #444;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              bottom: -8px;
              left: 16px;
              position: absolute;
            }
          }
        `}
      >
        <div
          css={css`
            font-size: 2rem;
            font-weight: 200;
            color: #4448;
            margin: 0 0 1rem;

            @media (max-width: 767px) {
              text-align: center;
            }
          `}
        >
          {index + 1}
        </div>
        {element}
      </div>
    ))}
  </ol>
);

export const Anchor = (props) => (
  <a
    css={css`
      cursor: pointer;
      display: inline;
      border-bottom: 2px solid #f9c959;

      &:hover {
        text-decoration: none;
        background: #f9c95922;
        outline: 8px solid #f9c95922;
      }
    `}
    {...props}
  />
);

export const H2 = styled.h2`
  text-align: center;
  font-weight: 200;
  font-size: 3.5rem;
  line-height: 1;
  margin: 0 0 4rem;
  display: flex;
  flex-direction: column;
  padding-top: 3.5rem;
  opacity: 0.5;

  // & span:first-of-type {
  //   font-size: 0.75rem;
  //   margin-bottom: 1rem;
  // }

  @media (min-width: 768px) {
    padding-top: 5.5rem;
    font-size: 4rem;

    // & span:first-of-type {
    //   font-size: 1rem;
    // }
  }
`;

export const H3 = styled.h3`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 400;
  margin: 0 0 2rem;
  opacity: 0.8;
  letter-spacing: 0.8px;
`;

export const H4 = styled.h4`
  margin: 0;
  padding: 1rem 0 2rem;
  font-size: 1.75rem;
  line-height: 1.5;
  font-weight: normal;
  letter-spacing: 0.4px;

  & img {
    margin-left: 1rem;
    padding-bottom: 0.25rem;
    vertical-align: middle;
  }
`;

const Carousel = ({ children }) => (
  <Slider
    dots
    arrows
    infinite
    autoplay
    speed={500}
    autoplaySpeed={6000}
    slidesToScroll={1}
    centerMode
    slidesToShow={2}
    centerPadding={"128px"}
    mobileFirst={true}
    responsive={[
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "16px",
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          centerPadding: "72px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "96px",
        },
      },
    ]}
    css={css`
      margin: 2rem 0 8rem;

      @media (min-width: 768px) {
        margin: 4rem 0 12rem;
      }

      .wp-block-media-text {
        position: relative;
      }

      .wp-block-media-text__content {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0;
        text-align: right;
        z-index: -1;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          margin: 0;
          text-align: center;
        }
      }

      .wp-block-media-text__media {
        margin: 0;
        padding: 0;

        img {
          height: calc(100% - 64px);
          width: 100%;
          object-fit: cover;
        }
      }

      .slick-slide {
        margin: 0 0.5rem;
        height: inherit !important;
      }

      .slick-track {
        display: flex !important;
      }

      .slick-next,
      .slick-prev {
        z-index: 1;
        top: calc(100% + 2.5rem);
        width: 40px;
        height: 40px;
        padding: 4px;
        &::before {
          font-size: 32px;
          color: #777;
        }

        @media (min-width: 768px) {
          top: calc(100% + 4rem);
        }
      }

      .slick-next {
        right: 0;
        @media (min-width: 768px) {
          right: calc(-50vw + 50% + 2rem);
        }
      }

      .slick-prev {
        left: 0;
        @media (min-width: 768px) {
          left: calc(-50vw + 50% + 2rem);
        }
      }

      .slick-dots {
        bottom: -48px;

        @media (min-width: 768px) {
          bottom: -74px;
        }

        li button:before {
          font-size: 12px;
        }
      }

      @media (min-width: 960px) {
        .slick-list {
          margin: 0 calc(-50vw + 50%);
        }
      }
    `}
  >
    {children}
  </Slider>
);

const elements = [
  ["a", Anchor],
  ["h2", H2],
  ["h3", H3],
  ["h4", H4],
];

const createEntry = (test, component, _processor) => ({
  test:
    typeof test === "function" ? test : ({ node }) => node.component === test,
  processor:
    _processor ||
    (({ node }) => {
      node.component = component;
      return node;
    }),
});
