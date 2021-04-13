import { styled } from "frontity";
import Image from "@frontity/components/image";
import logoUrl from '../assets/logo.jpg'

const Logo = ({ sticky }) => (
  <StyledImage
    alt="Visit Auschwitz"
    src={logoUrl}
    sticky={sticky}
  />
)

export default Logo;

const StyledImage = styled(Image)`
  display: block;
  height: 69px;
  transition: height 300ms ease-out;
  height: ${props => props.sticky ? 48 : 69}px;
  width: 100%
  margin: 2px 0 1px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: ${props => props.sticky ? 38 : 69}px;
  }
`;
