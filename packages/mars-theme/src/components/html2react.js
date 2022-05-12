import { styled, css } from "frontity"
import Slider from "react-slick";

export const init = ({ libraries }) => {
  elements.map(([tag, component]) => {
    const entry = createEntry(tag, component)
    libraries.html2react.processors.push(entry)
  })

  const carouselEntry = createEntry(
    ({ node }) =>
      node.component === 'div' && node.props.className.includes('carousel'),
    null,
    ({ node }) => {
      node.component = Carousel
      node.children = node.children[0].children
      // for (child in node.children) {
      //   child.parent = node
      // }
      return node
    }
  )

  libraries.html2react.processors.push(carouselEntry)
}

export default init

const Anchor = props => (
  <a css={css`
  border-bottom: 2px solid #f9c959;

  &:hover {
    text-decoration: none;
    color: #888;
  }`} {...props} />
)

const H2 = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  padding-top: 3.5rem;

  & span:first-of-type {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    padding-top: 5.5rem;

    & span:first-of-type {
      font-size: 1rem;
    }
  }
`

const H3 = styled.h3`
  font-size: 1.75rem;
  font-weight: normal;
  margin: 0.5rem 0;
`

const H4 = styled.h4`
  display: inline-flex;
  margin: 0;
  padding: 1rem 0;
  font-size: 1.25rem;
  font-weight: normal;

  & img {
    margin-left: 1rem;
    padding-bottom: 0.25rem;
    vertical-align: middle;
  }
`

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
    centerPadding={'128px'}
    mobileFirst={true}
    responsive={[{
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        centerPadding: '16px'
      }
    }, {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
        centerPadding: '72px'
      }
    }, {
      breakpoint: 1400,
      settings: {
        slidesToShow: 1,
        centerPadding: '96px'
      }
    }]}
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
      background: #444d;
      width: 100%;
      color: #fffffe;
      padding: 0 1rem;
      text-align: right;
      z-index: -1;
    }

    .wp-block-media-text__media {
      margin: 0;
      padding: 0;

      img {
        height: calc(100% - 56px);
        width: 100%;
      }
    }

    .slick-slide {
      margin: 0 0.5rem;
      height: inherit !important;
    }

    .slick-track {
      display: flex !important;
    }

    .slick-next, .slick-prev {
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
)

const elements = [
  ['a', Anchor],
  ['h2', H2],
  ['h3', H3],
  ['h4', H4],
]

const createEntry = (test, component, _processor) => ({
  test: typeof test === 'function'
    ? test
    : ({ node }) => node.component === test,
  processor: _processor ||
    (({ node }) => {
      node.component = component;
      return node;
    })
})
