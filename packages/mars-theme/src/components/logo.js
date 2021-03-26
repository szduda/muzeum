import { styled } from "frontity";
import Image from "@frontity/components/image";
import logoUrl from '../assets/logo.jpg'

const Logo = () => (
  <StyledImage
    alt="Visit Auschwitz"
    src={logoUrl}
  />
)

export default Logo;

const StyledImage = styled(Image)`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
