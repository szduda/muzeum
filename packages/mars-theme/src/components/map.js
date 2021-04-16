import { styled, connect, Global } from "frontity";
import { Icon } from "./theme";
import MapModal from "./map-modal";
import { CloseIcon } from './menu-icon'

function Map({ state, actions }) {
  const { isMapOpen } = state.theme;
  return (
    <>
      <MapToggle isOpen={isMapOpen} onClick={actions.theme.toggleMap}>
        {isMapOpen
          ? (
            <>
              <Global styles={{ body: { overflowY: "hidden", paddingRight: '15px' } }} />
              <CloseIcon size="24px" color="#444" />
            </>
          ) : <Icon.Map />}
      </MapToggle>
      {isMapOpen && <MapModal />}
    </>
  );
}

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
  ${({ isOpen }) => isOpen && 'right: calc(0.5rem + 15px);'}
`;

export default connect(Map);
