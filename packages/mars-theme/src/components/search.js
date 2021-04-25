import { connect, styled, Global } from "frontity"
import { Icon } from "../components/theme"
import SearchModal from './search-modal'
import { useMediaQuery, getBodyLockStyle } from '../helpers'

const Search = ({ state, actions }) => {
  const { open } = state.theme.search
  const isWideScreen = useMediaQuery('(min-width: 768px)');
  return (
    <SearchWrapper>
      {open && <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />}
      <SearchToggle onClick={actions.theme.search.toggle}>
        <Icon.Search />
      </SearchToggle>
      {open && <SearchModal />}
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

  svg {
    height: 24px;
    fill: #444;
  }

  :hover svg {
    fill: #f9c959;
  }
`

const SearchWrapper = styled.div`
  display: flex;
`