import { connect, styled, css, loadable } from "frontity";
import Link from "../link";
import MobileMenu from "./mobile/menu";
import { LogoIcon, Slide, ArrowIcon } from "../theme";
import { useMediaQuery } from "../../helpers";

const Search = loadable(() => import("./search"));
const Nav = loadable(() => import("./nav"));

const Header = ({ state, actions }) => {
  const {
    isHeaderSticky: sticky,
    isMobileMenuOpen,
    isSettingsOpen,
    search,
  } = state.theme;

  const Logo = (props) => (
    <LogoLink
      $small
      link="/"
      $hidden={sticky && !isMobileMenuOpen}
      {...props}
      name="visitauschwitz.info"
    >
      <LogoIcon lighten={isMobileMenuOpen} small />
    </LogoLink>
  );

  const isWideScreen = useMediaQuery("(min-width: 768px)");

  return (
    <Container sticky={sticky} blur={state.theme.search.open}>
      <Row>
        <Slide
          left
          $offset="-64px"
          opaque
          open={isMobileMenuOpen && (search.open || isSettingsOpen)}
          className="mobile-only"
        >
          <div
            css={css`
              display: inline-flex;
            `}
          >
            <BackButton
              onClick={
                isSettingsOpen
                  ? actions.theme.toggleSettings
                  : actions.theme.search.toggle
              }
            >
              <ArrowIcon angle={270} />
            </BackButton>
            {isMobileMenuOpen && <Logo />}
          </div>
        </Slide>
        <LogoLink
          link="/"
          className="widescreen-only"
          name="visitauschwitz.info"
        >
          <LogoIcon />
        </LogoLink>
        {isWideScreen && <Nav />}
        {isWideScreen && (
          <IconsRow>
            <Search />
          </IconsRow>
        )}
      </Row>
      <MobileMenu />
    </Container>
  );
};

export default connect(Header);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
  background: transparent;
  transition: background-color 600ms ease-out, color 600ms ease-out,
  backdrop-filter 150ms ease-out;
  color: #444;

  @media (min-width: 960px) {
    height: 56px;
    background-color: #fffff022;
    backdrop-filter: blur(${(props) => (props.blur ? 10 : 4)}px) saturate(0.5)
      contrast(0.3) brightness(1.1);
    ${(props) =>
      props.sticky &&
      `
    backdrop-filter: blur(2px) saturate(0.3) contrast(0.3) brightness(1.4);
    background-color: #fffff088;
    box-shadow: 0 2px 4px #4444;
    `}
  }

  .widescreen-only {
    display: none !important;
  }
  @media (min-width: 960px) {
    .widescreen-only {
      display: initial !important;
    }
    .mobile-only {
      display: none !important;
    }
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: 0;
  padding: 0.75rem;
  margin: 0.25rem;
`;

const LogoLink = styled(Link)`
  width: ${(props) => (props.$small ? 127 : 208)}px;
  box-sizing: border-box;
  height: 48px;
  display: block;
  box-sizing: border-box;
  padding: ${(props) => (props.$small ? '10px 1rem 0.5rem' : '0.5rem')};
  margin: 0 0 0 1rem;
  z-index: 3;
  transition: opacity 300ms ease-out;
  text-decoration: none;

  :focus {
    outline-offset: 10px;
  }

  @media (max-width: 959px) {
    margin: 0;
    transform: translateY(8px);
    ${(props) =>
      props.$hidden &&
      `
    pointer-events: none;
    opacity: 0;
    `}
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconsRow = styled(Row)`
  display: none;
  width: 190px;
  justify-content: flex-end;
  margin: 0 1.5rem 0 0;

  svg {
    box-shadow: 0 0 24px #fffff066;
    border-radius: 50%;
    background: #fffff022;
    overflow: visible;
  }

  @media (min-width: 960px) {
    display: flex;
  }
`;
