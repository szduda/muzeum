import { styled, connect, Global } from "frontity";
import { Icon } from "./theme";
import MapModal from "./map-modal";
import { CloseIcon } from './menu-icon'
import { useMediaQuery } from '../helpers'

function Map({ state, actions }) {
  const { isMapOpen, isMobileMenuOpen } = state.theme;
  const isWideScreen = useMediaQuery('(min-width: 768px)');
  return (
    <>
      {!isMobileMenuOpen && <MapToggle isOpen={isMapOpen} onClick={actions.theme.toggleMap} isWideScreen={isWideScreen}>
        {isMapOpen
          ? (
            <>
              <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />
              <CloseIcon size="24px" color="#444" />
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
  right: 0.5rem;
  bottom: 1rem;
  padding: 0.5rem;
  border: 0;
  background: #f9c959;
  border-radius: 8px;
  z-index: 8;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isOpen, isWideScreen }) => isOpen && `right: calc(0.5rem + ${isWideScreen ? '15px' : 0});`}

  @media (min-width: 768px) {
    right: calc(0.5rem + 15px);
  }
`;

export default connect(Map);
