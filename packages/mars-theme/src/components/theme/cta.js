import { styled } from "frontity";

export const CTA = styled.button`
  align-self: flex-end;
  border: 2px solid #4444;
  border-radius: 6px;
  color: #444;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1.1;
  padding: 0.25rem 0.5rem;
  text-transform: lowercase;
  margin: 0;
  cursor: pointer;
  font-variant: all-small-caps;
  font-weight: 600;
  min-width: 100px;
  display: block;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  transition: color 300ms, background-color 300ms;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

  :focus {
    outline-offset: 4px;
  }

  > span {
    vertical-align: middle;
    transform: translateY(-2px);
    display: inline-block;
  }

  :hover {
    background-color: #4441;
  }

  @media (min-width: 768px) {
    padding: 0.25rem 1rem;
  }
`;
