import { forwardRef, useMemo } from "react";
import { styled } from "frontity";
import { buildings } from "./buildings";
import { LocateMeButton, LocationMarker } from "./location";
import { useMediaQuery } from "../../helpers";

const a1center = [50.0271, 19.203];

const entranceAuschwitz = [50.02772, 19.20164];
const entranceBirkenau = [50.03439, 19.18107];

const carparkMuzeum = [50.02826, 19.20075];
const carparkSzajny = [50.02717, 19.19931];
const carparkBirkenau = [50.03555, 19.18403];
const carparkImperiale = [50.02856, 19.1986];
const carparkRide = [50.04275, 19.20224];
const carparkRadius = 25;
const carparkColor = "blue";

const MapModal = forwardRef(({ onClick, isMobile }, ref) => {
  let MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    LayerGroup,
    LayersControl,
    CircleMarker;
  useMemo(() => {
    MapContainer = require("react-leaflet").MapContainer;
    TileLayer = require("react-leaflet").TileLayer;
    LayerGroup = require("react-leaflet").LayerGroup;
    LayersControl = require("react-leaflet").LayersControl;
    Marker = require("react-leaflet").Marker;
    CircleMarker = require("react-leaflet").CircleMarker;
    Popup = require("react-leaflet").Popup;
    Polygon = require("react-leaflet").Polygon;
  }, []);

  const currentAnchor = "car";

  const layers = [
    {
      name: "Buildings",
      markers: Object.keys(buildings).map((slug) => (
        <Polygon key={slug} positions={buildings[slug]} />
      )),
    },
    {
      name: "Museum entrances",
      anchors: ["car"],
      markers: (
        <>
          <Marker position={entranceAuschwitz}>
            <Popup>
              <h4>Auschwitz I Main Camp</h4>Start your tour here and continue in{" "}
              <a
                href="https://visitauschwitz.info/auschwitz-birkenau/#get-to-birkenau"
                target="_blank"
              >
                Birkenau.
              </a>
            </Popup>
          </Marker>
          <Marker position={entranceBirkenau}>
            <Popup>
              <h4>Auschwitz II Birkenau</h4>You start the second part of your
              tour here.
            </Popup>
          </Marker>
        </>
      ),
    },
    {
      name: "Parking lots",
      anchors: ["car"],
      markers: (
        <>
          <CircleMarker
            center={carparkMuzeum}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>
              <h5>Temporarily unavailable</h5>The main Auschwitz parking lot is
              closed due to construction works. Museum{" "}
              <a href="https://visitauschwitz.info/arrival/" target="_blank">
                opening hours.
              </a>
            </Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkSzajny}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Prices per day and opening hours.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkImperiale}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Prices per day and opening hours.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkBirkenau}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Prices per day and opening hours.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkRide}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Prices per day and opening hours.</Popup>
          </CircleMarker>
        </>
      ),
    },
  ];

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

            <LocationMarker />
            <LayersControl position="topright" collapsed={isMobile ?? true}>
              {layers.map((layer) => (
                <LayersControl.Overlay
                  checked={layer.anchors?.includes(currentAnchor)}
                  name={layer.name}
                  key={layer.name}
                >
                  <LayerGroup>{layer.markers}</LayerGroup>
                </LayersControl.Overlay>
              ))}
            </LayersControl>
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
