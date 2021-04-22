import { connect, styled } from "frontity"
import { Icon } from "../components/theme"

const Search = () => {

  return (
    <SearchWrapper>
      <SearchToggle>
        <Icon.Search />
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
  align-items: center;
`