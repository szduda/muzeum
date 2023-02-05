import { useRef } from "react";
import { styled, connect, Global, Head, loadable } from "frontity";
import { CloseIcon, MapIcon } from "../theme";
import { useMediaQuery, getBodyLockStyle } from "../../helpers";

const MapModal = loadable(() => import("./map-modal"));

const Map = ({ state, actions }) => {
  const { isMapOpen, isMobileMenuOpen } = state.theme;
  const isWideScreen = useMediaQuery("(min-width: 768px)");
  const mapRef = useRef();

  return (
    <>
      {!isMobileMenuOpen && (
        <>
          <MapToggle
            isOpen={isMapOpen}
            onClick={actions.theme.toggleMap}
            isWideScreen={isWideScreen}
          >
            {isMapOpen ? <CloseIcon /> : <MapIcon />}
          </MapToggle>
          {isMapOpen && (
            <>
              <Head>
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                  crossorigin=""
                />
                {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
                <script
                  src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                  type="text/javascript"
                  async
                  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                  crossorigin=""
                />
              </Head>
              <Global styles={getBodyLockStyle({ padRight: isWideScreen })} />
            </>
          )}
        </>
      )}
      {isMapOpen && (
        <MapModal
          ref={mapRef}
          onClick={() => isMapOpen && actions.theme.toggleMap()}
        />
      )}
    </>
  );
};

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
  ${({ isOpen, isWideScreen }) =>
    isOpen && `right: calc(0.5rem + ${isWideScreen ? "15px" : 0});`}

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
