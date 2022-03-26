import { connect, styled } from 'frontity'

export const Footer = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const { type, id } = state.source.get('/footer/')
  const data = state.source?.[type]?.[id]
  const { contactPhone, contactMail } = data || {}
  const html = data?.content?.rendered

  console.log(data)

  return (
    <FooterWrapper>
      <FooterContent>
        {html && <Html2React html={data?.content?.rendered} />}
        <div id="contact">
          <h4>Contact</h4>
          <a href={`tel:${contactPhone}`}>{contactPhone}</a>
          <a href={`mailto:${contactMail}`}>{contactMail}</a>
        </div>
      </FooterContent>
    </FooterWrapper>
  )
}

export default connect(Footer)

const FooterWrapper = styled.div`
  width: 100%;
  background: #444a;
  border-top: 2px solid #888;
`

const FooterContent = styled.div`
  min-height: 400px;
  width: 100%;
  max-width: 960px;
  display: flex;
  color: #d4d4d4;
  padding: 5rem 1rem;
  margin: 0 auto;
  flex-wrap: wrap;

  h5 {
    color: #888;
    font-weight: normal;
    font-variant: all-small-caps;
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    transform: translateX(-0.5rem);
  }

  a {
    border: none;
  }

  a:hover {
    color: #f9c959;
    text-decoration: underline;
  }

  .wp-block-columns {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 100%;
  }

  .wp-block-column {
    flex-basis: 128px;
    margin: 0 1rem 2rem 0;
    box-sizing: border-box;
  }

  div#contact {
    background: #888a;
    margin: 0;
    flex-grow: 1;
    border-radius: 16px;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    height: fit-content;

    a {
      font-size: 1.4rem;
      line-height: 3rem;
    }

    h4 {
      margin-top: 0;
      color: #afafaf;

    }
  }

  ul {
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;

    li {
      padding: 0;
      margin: 0 0 0.5rem;
      min-height: 18px;
    }
  }

  @media(min-width: 768px) {
    padding: 8rem 1rem 4rem;

    .wp-block-columns {
      flex-basis: 55%;
    }
    
    .wp-block-column {
      flex-basis: 200px;
    }

    div#contact {
      padding: 2rem;

      a {
        font-size: 2rem;
      }
    }
  }
`