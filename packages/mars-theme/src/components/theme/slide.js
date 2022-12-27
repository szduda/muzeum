import { styled } from 'frontity'

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  transition: transform 150ms ease-out, opacity 150ms ease-out, visibility 150ms ease-out;
  z-index: 5;

  > * {
    pointer-events: initial;
  }

  ${props => !props.open && `
    ${props.opaque === undefined ? `
      visibility: hidden;
      opacity: 0;
    ` : ''}
    ${props.down !== undefined ? `transform: translateY(-2rem);` : ''}
    ${props.left !== undefined ? `transform: translateX(${props.$offset || '-100vw'});` : ''}
    ${props.right !== undefined ? `transform: translateX(${props.$offset || '100vw'});` : ''}
  `}
`;