import { css, Head } from "frontity";
import Slider from "react-slick";

export const Carousel = ({ children }) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Head>
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
  </>
);

export default Carousel;
