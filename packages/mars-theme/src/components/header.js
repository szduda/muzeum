import { connect, styled } from "frontity"
import Link from "./link"
import Nav from "./nav"
import MobileMenu from "./menu"
import { Icon } from './theme'
import Settings from './settings'
import Search from './search'

const Header = ({ state }) => {
  const {
    isHeaderSticky: sticky,
    isMobileMenuOpen
  } = state.theme

  return (
    <Container sticky={sticky}>
      <Row>
        <LogoLink link="/" $hidden={sticky && !isMobileMenuOpen}>
          <Icon.Logo lighten={isMobileMenuOpen} />
        </LogoLink>
        <Nav />
        <IconsRow>
          <Search />
          <Settings />
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
  transition: background-color 600ms ease-out, color 600ms ease-out;
  color: ${props => props.sticky ? '#444' : '#fffff0'};

  @media (min-width: 960px) {
    background-color: #fffff011;
    backdrop-filter: blur(2px);
    ${props => props.sticky && `
    backdrop-filter: blur(2px) saturate(0.3) contrast(0.4) brightness(1.4);
    background-color: #fffff088;
    box-shadow: 0 2px 4px #4444;
    `}
  }
`

const LogoLink = styled(Link)`
  width: 128px;
  height: 48px;
  display: block;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 0 0 0 1rem;
  z-index: 3;
  transition: opacity 300ms ease-out;
  text-decoration: none;
  
  @media (max-width: 959px) {
    margin: 0;
    transform: translateY(12px);
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
  width: 120px;
  justify-content: flex-end;
  margin: 0 1.5rem 0 0;
  
  svg {
    box-shadow: 0 0 16px #fffff077;
    border-radius: 50%;
    background: #fffff033;
    overflow: visible;
  }

  @media (min-width: 960px) {
    display: flex;
  }
`