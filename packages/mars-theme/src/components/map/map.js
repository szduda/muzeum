import { styled, connect, Global } from "frontity";
import { Icon } from "../theme";
import MapModal from "./map-modal";
import { useMediaQuery, getBodyLockStyle } from '../../helpers'

const Map = ({ state, actions }) => {
  const { isMapOpen, isMobileMenuOpen } = state.theme;
  const isWideScreen = useMediaQuery('(min-width: 768px)');
  return (
    <>
      {!isMobileMenuOpen && <MapToggle isOpen={isMapOpen} onClick={actions.theme.toggleMap} isWideScreen={isWideScreen}>
        {isMapOpen
          ? (
            <>
              <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />
              <Icon.Close />
            </>
          ) : <Icon.Map />}
      </MapToggle>}
      {isMapOpen && <MapModal />}
    </>
  );
}

const MapToggle = styled.button`
  position: fixed;
  cursor: pointer;
  right: 0.5rem;
  bottom: 1rem;
  padding: 0.5rem;
  border: 2px solid #fffff0;
  background: #fffff0;
  border-radius: 8px;
  z-index: 8;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isOpen, isWideScreen }) => isOpen && `right: calc(0.5rem + ${isWideScreen ? '15px' : 0});`}

  svg {
    fill: #444;
  }

  :hover {
    background: #444;
    svg {
      fill: #fffff0;
    }
  }

  @media (min-width: 768px) {
    right: calc(0.5rem + 15px);
  }
`;

export default connect(Map);
