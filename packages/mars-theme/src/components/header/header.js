import { connect, styled, css } from "frontity"
import Link from "../link"
import Nav from "./nav"
import MobileMenu from "./mobile/menu"
import { Icon, Slide } from '../theme'
import Settings from './settings'
import Search from './search'

const Header = ({ state, actions }) => {
  const {
    isHeaderSticky: sticky,
    isMobileMenuOpen,
    isSettingsOpen,
    search
  } = state.theme

  const Logo = props => (
    <LogoLink $small link="/" $hidden={sticky && !isMobileMenuOpen} {...props}>
      <Icon.Logo lighten={isMobileMenuOpen} small />
    </LogoLink>
  )

  return (
    <Container sticky={sticky} blur={state.theme.search.open}>
      <Row>
        <Slide left $offset="-64px" opaque open={isMobileMenuOpen && (search.open || isSettingsOpen)} className="mobile-only">
          <div css={css`display: inline-flex`}>
            <BackButton onClick={isSettingsOpen ? actions.theme.toggleSettings : actions.theme.search.toggle}>
              <Icon.Arrow angle={270} />
            </BackButton>
            <Logo />
          </div>
        </Slide>
        <LogoLink link="/" className="widescreen-only">
          <Icon.Logo />
        </LogoLink>
        <Nav />
        <IconsRow>
          <Search />
          {/* <Settings /> */}
        </IconsRow>
      </Row>
      <MobileMenu />
    </Container>
  )
}

export default connect(Header)

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
  transition: background-color 600ms ease-out, color 600ms ease-out, backdrop-filter 150ms ease-out;
  // color: ${props => props.sticky ? '#444' : '#fffff0'};
  color: #444;

  @media (min-width: 960px) {
    background-color: #fffff022;
    backdrop-filter: blur(${props => props.blur ? 10 : 4}px) saturate(0.5) contrast(0.3) brightness(1.1);
    ${props => props.sticky && `
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
`

const BackButton = styled.button`
  display: flex; 
  align-items: center;
  border: 0;
  background: 0;
  padding: 0.75rem;
  margin: 0.25rem;
`

const LogoLink = styled(Link)`
  width: ${props => props.$small ? 127 : 208}px;
  box-sizing: border-box;
  height: 48px;
  display: block;
  box-sizing: border-box;
  padding: ${props => props.$small ? 0.75 : 0.5}rem;
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
    ${props => props.$hidden && `
    pointer-events: none;
    opacity: 0;
    `}
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

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
`