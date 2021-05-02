import { connect, styled, Global } from "frontity"
import { Icon } from "../components/theme"
import SearchModal from './search-modal'
import { useMediaQuery, getBodyLockStyle } from '../helpers'
import { Slide } from './theme'

const Search = ({ state, actions }) => {
  const { open } = state.theme.search
  const isWideScreen = useMediaQuery('(min-width: 768px)');
  return (
    <SearchWrapper>
      {open && <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />}
      <Slide down open={open}>
        <SearchModal />
      </Slide>
      <SearchToggle onClick={actions.theme.search.toggle}>
        <Icon.Search color={open ? '#f9c959' : '#444'} />
      </SearchToggle>
    </SearchWrapper>
  )
}

export default connect(Search)

const SearchToggle = styled.button`
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  margin: 0 2px;
  border-color: transparent !important;

  :hover svg {
    fill: #f9c959;
  }
`

const SearchWrapper = styled.div`
  display: flex;
`