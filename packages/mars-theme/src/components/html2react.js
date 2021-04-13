import { styled, css } from "frontity"
import Link from '../components/link'

export const init = ({ libraries }) => {
  elements.map(([tag, component]) => {
    const entry = createEntry(tag, component)
    libraries.html2react.processors.push(entry)
  })
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
  padding-top: 4rem;

  & span:first-of-type {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    margin: 2rem 0 6rem;
    padding-top: 6rem;

    & span:first-of-type {
      font-size: 1rem;
    }
  }
`

const H3 = styled.h3`
  font-size: 1.75rem;
  font-weight: normal;
  margin: 0;
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

const elements = [
  ['a', Anchor],
  ['h2', H2],
  ['h3', H3],
  ['h4', H4]
]

const createEntry = (test, component) => ({
  test: typeof test === 'function'
    ? test
    : ({ node }) => node.component === test,
  processor: ({ node }) => {
    node.component = component;
    return node;
  }
})