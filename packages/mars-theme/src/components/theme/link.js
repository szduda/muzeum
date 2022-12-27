import { styled } from "frontity";

export const Link = styled.a`
  text-decoration: underline;
  text-decoration-color: #f9c959;
  cursor: pointer;

  :hover {
    background: #f9c95922;
    text-decoration-color: #f9c959;
  }

  :visited {
    text-decoration-color: #f9c959;
  }
`;
