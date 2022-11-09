import React, { useMemo, useEffect, useState } from "react";
import { styled, connect } from "frontity";
import { buildings } from "./buildings";

const MapModal = () => {
  let MapContainer, TileLayer, Marker, Popup, Polygon, useMap;
  useMemo(() => {
    MapContainer = require("react-leaflet").MapContainer;
    TileLayer = require("react-leaflet").TileLayer;
    Marker = require("react-leaflet").Marker;
    Popup = require("react-leaflet").Popup;
    Polygon = require("react-leaflet").Polygon;
    // useMap = require("react-leaflet").useMap;
  }, []);

  const a1cener = [50.0271, 19.203];

  // const map = useMap?.()
  // useEffect(() => {
  //   const callback = (position) => {
  //     if (!position) return;
  //     const { longitude, latitude } = position.coords;
  //     const center = [latitude, longitude];
  //     map.setCenter(center);
  //   };
  //   navigator.geolocation.getCurrentPosition(callback);
  // }, []);

  return (
    <>
      <Overlay />
      <Content>
        <div id="map-container">
          <MapContainer center={a1cener} zoom={17} scrollWheelZoom={true}>
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
          </MapContainer>
        </div>
      </Content>
    </>
  );
};

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
