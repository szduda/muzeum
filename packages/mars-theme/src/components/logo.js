import { styled } from "frontity";
import Image from "@frontity/components/image";
import logoUrl from '../assets/visit-auschwitz-logo.svg'

const Logo = ({ sticky }) => (
  <StyledImage
    id="visit-auschwitz-logo"
    alt="Visit Auschwitz"
    src={logoUrl}
    sticky={sticky}
  />
)

export default Logo;

const StyledImage = styled(Image)`
  display: block;
  height: 2rem;
  transition: opacity 400ms ease-out;
  object-fit: cover;
  margin: 0.5rem 0;
  
  @media (max-width: 767px) {
    margin: 1.25rem 0.5rem 0;

    ${props => props.sticky && `
    pointer-events: none;
    opacity: 0;
    `}
  }
`;
