import { useRef } from 'react'
import { connect, styled, css } from "frontity";
import { Input, Form } from 'reactstrap'
import { Icon, Slide } from '../../theme'
import { MenuContent } from './menu-modal'
import useSearch from '../useSearch'
import Link from '../../link'

export const SearchContent = connect(({ landscape, open }) => {
  const inputRef = useRef()
  const [results, term, setTerm] = useSearch()
  return (
    <Slide left opaque={true} open={open}>
      <MenuContent css={css`
      height: calc(100vh - 4rem); 
      width: 100%; 
      background: #444;
      padding: 1rem 0.5rem;
    `}>
        <Form>
          <Input innerRef={inputRef}
            autoFocus
            name="searchTerm"
            placeholder="I am searching for..."
            value={term}
            onChange={e => setTerm(e.target.value)}
            onFocus={() => { inputRef.current?.select() }}
            css={css`width: 100%; background: #444; color: #fffff0;`}
          />
        </Form>
        {results.length ? (
          <ResultsWrapper>
            {results.map((item, index) =>
              <ResultItem key={index} delay={index} link={getUrl(item.url)}>
                {item.title}
              </ResultItem>
            )}
            <AllResultsButton link={`/search/${term}`}>
              See all results
            </AllResultsButton>
          </ResultsWrapper>
        ) : null}
      </MenuContent>
    </Slide>
  )
})

const getUrl = url => {
  const i1 = url.indexOf('://')
  const i2 = url.indexOf('/', i1 + 3)
  return url.substr(i2)
}

export const SearchToggle = ({ open, children, ...props }) => (
  <button css={css`
    display: flex; 
    align-items: center;
    border: 0;
    background: 0;
    color: #fffff0;
    font-size: 1rem;

    svg {
      ${open && `fill: #f9c959;`}
    }
  `} {...props}>
    {children || <Icon.Search />}
  </button>
)

const AllResultsButton = styled(Link)`
  margin: 1rem 0; 
  font-weight: 600; 
  font-size: 1.5rem; 
  padding: 0.25rem; 
  border-bottom: 2px solid #f9c959;

  :hover {
    text-decoration: none;
    color: #888;
  }
`

const ResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
`

const ResultItem = styled(Link)`
  @keyframes pop{
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  flex-basis: 288px;
  flex-shrink: 0;
  min-height: 80px;
  background: #555;
  border-radius: 6px;
  margin: 0 0 2rem;
  padding: 1rem;
  animation: pop 200ms ease-out ${props => props.delay ? props.delay * 100 : 0}ms backwards;

  :hover {
    background: #e2e2d2;
  }
`