import { forwardRef, useMemo } from "react";
import { styled } from "frontity";
import { buildings } from "./buildings";
import { LocateMeButton, LocationMarker } from "./location";

const MapModal = forwardRef(({ onClick }, ref) => {
  let MapContainer, TileLayer, Marker, Popup, Polygon;
  useMemo(() => {
    MapContainer = require("react-leaflet").MapContainer;
    TileLayer = require("react-leaflet").TileLayer;
    Marker = require("react-leaflet").Marker;
    Popup = require("react-leaflet").Popup;
    Polygon = require("react-leaflet").Polygon;
  }, []);

  const a1center = [50.0271, 19.203];

  return (
    <>
      <Overlay onClick={onClick} />
      <Content>
        <div id="map-container">
          <MapContainer
            center={a1center}
            zoom={17}
            scrollWheelZoom={true}
            ref={ref}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.keys(buildings).map((slug) => (
              <Polygon key={slug} positions={buildings[slug]} />
            ))}
            <Marker position={[50.0271, 19.203]}>
              <Popup>Auschwitz I</Popup>
            </Marker>
            <LocationMarker />
          </MapContainer>
        </div>
      </Content>
      <LocateMeButton mapRef={ref} />
    </>
  );
});

const Overlay = styled.div`
  background-color: #444d;
  backdrop-filter: blur(4px);
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  z-index: 7;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  // height: calc(100vh - 52px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #map-container {
    width: 100%;
    height: 100%;
    background: #afafaf;

    > div {
      height: 100%;
    }
  }

  @media (min-width: 1024px) {
    padding: 4rem;
  }

  @media (min-width: 1440px) {
    padding: 6rem;
  }
`;

export default MapModal;
