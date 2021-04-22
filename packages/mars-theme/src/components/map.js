import { styled, connect, Global } from "frontity";
import { Icon } from "./theme";
import MapModal from "./map-modal";
import { useMediaQuery } from '../helpers'

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

const getBodyLockStyle = ({ padRight }) => ({
  body: {
    overflowY: "hidden",
    paddingRight: padRight ? '15px' : 0
  }
})

const MapToggle = styled.button`
  position: fixed;
  cursor: pointer;
  right: 0.5rem;
  bottom: 1rem;
  padding: 0.5rem;
  border: 2px solid #f9c959;
  background: #f9c959;
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
      fill: #f9c959;
    }
  }

  @media (min-width: 768px) {
    right: calc(0.5rem + 15px);
  }
`;

export default connect(Map);
