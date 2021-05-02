import { useEffect, useLayoutEffect, useRef } from 'react'
import { styled, css, connect } from "frontity"
import { Input, Form } from 'reactstrap'
import Link from './link'
import { Icon } from './theme'

const SearchModal = ({ state, actions, libraries }) => {
  const { results, term } = state.theme.search
  const { setResults, setTerm, toggle } = actions.theme.search
  const inputRef = useRef()

  useLayoutEffect(() => {
    inputRef.current.focus()
  })

  useEffect(() => {
    if (!!!term || term.trim().length < 3)
      return

    const fetchResults = async () => {
      // actions.source.fetch(`search?search=${encodeURIComponent(term)}`)
      // console.log(state.source.get('posts'))
      // const p = await libraries.source.api.get({ endpoint: 'posts' })
      // const j = await p.json()
      // console.log(j)
      const response = await fetch(`https://www.lucanus.ayz.pl/wp-json/wp/v2/search?search=${encodeURIComponent(term)}`)
      const results = await response.json()
      setResults(results)
      console.log(results)
    }
    fetchResults()
  }, [term])

  return (
    <Wrapper>
      <Overlay />
      <Content>
        <Form css={css`margin-bottom: 4rem;`}>
          <Input innerRef={inputRef} name="searchTerm" placeholder="I am searching for..."
            value={term}
            onChange={e => setTerm(e.target.value)}
            onFocus={() => inputRef.current.select()}
          />
        </Form>
        {results.length ? <ResultsWrapper>
          {results.map((item, index) =>
            <ResultItem key={index} delay={index} link={getUrl(item.url)}>
              {item.title}
            </ResultItem>
          )}
        </ResultsWrapper>
          : null}
        {results.length ? (
          <AllResultsButton link={`/search/${term}`}>
            See all results
          </AllResultsButton>
        ) : null}
      </Content>
      <CloseButton onClick={toggle}>
        <Icon.Close />
      </CloseButton>
    </Wrapper>
  )
}

export default connect(SearchModal)

const getUrl = url => {
  const i1 = url.indexOf('://')
  const i2 = url.indexOf('/', i1 + 3)
  return url.substr(i2)
}

const Overlay = styled.div`
  background-color: #fffff0aa;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 12px;
  position: fixed;
  top: 5rem;
  right: 4rem;
  cursor: pointer;
  
  svg {
    height: 48px;
    width: 48px;
  }

  :hover svg {
    fill: #888;
  }
`

const AllResultsButton = styled(Link)`
  margin: 1.75rem auto 2rem; 
  font-weight: 600; 
  font-size: 1.5rem; 
  padding: 0.25rem; 
  border-bottom: 2px solid #f9c959;

  :hover {
    text-decoration: none;
    color: #888;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fffff0;
  backdrop-filter: blur(4px);
  width: 100vw;
  // height: 100vh;
  position: fixed;
  top: 52px;
  left: 0;
  color: #444;
  box-shadow: 0 2px 4px #4444;
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

  box-sizing: border-box;
  flex-basis: 288px;
  flex-shrink: 0;
  height: 240px;
  background: #d4d4d4;
  border-radius: 6px;
  margin: 0 2rem 2rem 0;
  padding: 1rem;
  animation: pop 200ms ease-out ${props => props.delay ? props.delay * 100 : 0}ms backwards;
`

const ResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const Content = styled.div`
  padding: 1rem;
  overflow: hidden;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1088px;
  align-items: center;

  @media (min-width: 768px) {
    padding: 4rem 4rem 2rem;
  }
`;

