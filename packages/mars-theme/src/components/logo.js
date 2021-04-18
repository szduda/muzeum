import { styled } from "frontity";
import Image from "@frontity/components/image";
import logoUrl from '../assets/visit-auschwitz-logo.svg'

const Logo = () => (
  <StyledImage
    id="visit-auschwitz-logo"
    alt="Visit Auschwitz"
    src={logoUrl}
  />
)

export default Logo;

const StyledImage = styled(Image)`
  display: block;
  height: 2rem;
  object-fit: cover;
  margin: 0.5rem 0;
  
  @media (max-width: 767px) {
    margin: 1.25rem 0.5rem 0;
  }
`;
