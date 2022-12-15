import { styled } from "frontity";

export const H2 = styled.h2`
  text-align: center;
  font-weight: 200;
  font-size: 3.5rem;
  line-height: 1;
  margin: 0 0 4rem;
  display: flex;
  flex-direction: column;
  padding-top: 3.5rem;
  opacity: 0.5;

  // & span:first-of-type {
  //   font-size: 0.75rem;
  //   margin-bottom: 1rem;
  // }

  @media (min-width: 768px) {
    padding-top: 5.5rem;
    font-size: 4rem;

    // & span:first-of-type {
    //   font-size: 1rem;
    // }
  }
`;

export const H3 = styled.h3`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 400;
  margin: 0 0 2rem;
  opacity: 0.8;
  letter-spacing: 0.8px;
`;

export const H4 = styled.h4`
  margin: 0;
  padding: 1rem 0 2rem;
  font-size: 1.75rem;
  line-height: 1.5;
  font-weight: normal;
  letter-spacing: 0.4px;

  & img {
    margin-left: 1rem;
    padding-bottom: 0.25rem;
    vertical-align: middle;
  }
`;
