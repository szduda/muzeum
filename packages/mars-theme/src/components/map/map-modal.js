import React, { useMemo } from 'react'
import { styled, connect } from "frontity"

const MapModal = () => {
  let MapContainer, TileLayer, Marker, Popup;
  useMemo(() => {
    MapContainer = require('react-leaflet').MapContainer
    TileLayer = require('react-leaflet').TileLayer
    Marker = require('react-leaflet').Marker
    Popup = require('react-leaflet').Popup
  }, [])

  return (
    <>
      <Overlay />
      <Content>
        <div id="map-container">
          <MapContainer center={[50.0271, 19.2030]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[50.0271, 19.2030]}>
              <Popup>
                Auschwitz I
            </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Content>
    </>
  );
}

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
    max-width: 1280px;
    max-height: 720px;

    > div {
      height: 100%;
    }
  }

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

export default connect(MapModal);
