import { connect, styled } from "frontity";

export const Footer = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const { type, id } = state.source.get("/footer/");
  const data = state.source?.[type]?.[id];
  const { contactPhone, contactMail } = data || {};
  const html = data?.content?.rendered;

  return (
    <FooterWrapper>
      <FooterContent>
        <Row>
          {html && <Html2React html={data?.content?.rendered} />}
          <div id="contact">
            <h4>Contact</h4>
            {contactPhone && <a href={`tel:${contactPhone}`}>{contactPhone}</a>}
            {contactMail && <a href={`mailto:${contactMail}`}>{contactMail}</a>}
          </div>
        </Row>
        <Copyright>© 2022 visitauschwitz.info</Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

export default connect(Footer);

const Row = styled.div`
  width: 100%;
  display: contents;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Copyright = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 10px;
  letter-spacing: 2px;
  padding: 2rem 0 0;

  @media (min-width: 768px) {
    padding: 4rem 0 0;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  background: #444a;
  border-top: 2px solid #888;
`;

const FooterContent = styled.div`
  min-height: 400px;
  width: 100%;
  max-width: 960px;
  display: flex;
  color: #d4d4d4;
  padding: 5rem 1rem 2rem;
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
    text-decoration: none !important;
  }

  a:hover {
    color: #f9c959;
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
      align-self: flex-start;
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

  @media (min-width: 768px) {
    padding: 8rem 2rem 2rem;

    .wp-block-columns {
      flex-basis: 50%;
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
`;
