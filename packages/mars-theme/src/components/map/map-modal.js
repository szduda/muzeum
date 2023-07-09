import { forwardRef, useMemo } from "react";
import { styled } from "frontity";
import { buildings } from "./buildings";
import { LocateMeButton, LocationMarker } from "./location";

const entranceAuschwitz = [50.02949, 19.20553];
const entranceBirkenau = [50.03439, 19.18107];

const carparkMuzeum = [50.02997, 19.20587];
const carparkSzajny = [50.02717, 19.19931];
const carparkBirkenau1 = [50.03555, 19.18403];
const carparkBirkenau2 = [50.04003, 19.18164];
const carparkImperiale = [50.02856, 19.1986];
const carparkRide = [50.04275, 19.20224];
const carparkJaracza = [50.03236, 19.19818];
const carparkRadius = 25;
const carparkColor = "blue";

const MapModal = forwardRef(({ onClick, isMobile, currentAnchor }, ref) => {
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

  const layers = [
    {
      name: "Auschwitz I buildings",
      anchors: ["A1"],
      markers: Object.keys(buildings).map((slug) => (
        <Polygon key={slug} positions={buildings[slug]} />
      )),
    },
    {
      name: "Museum entrances",
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
      anchors: ["car", "default"],
      markers: (
        <>
          <CircleMarker
            center={carparkMuzeum}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>
              Car – 20 PLN
              <br />
              Minibus – 30 PLN
              <br />
              Bus – 40 PLN
              <br />
              Camper – 90 PLN
              <br />
              Motorcycle – 15 PLN
              <br />
              <h5>
                <a
                  href="https://visitauschwitz.info/get-ready/#on-site"
                  target="_blank"
                >
                  Learn what's on site.
                </a>
              </h5>
            </Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkSzajny}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Józefa Szajny Street parking lot.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkImperiale}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Hotel Imperiale parking lot.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkBirkenau1}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>
              40 PLN for vehicles not higher than 240 cm and 80 PLN for others.
            </Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkBirkenau2}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>
              Car (up to 20 people) – 20 PLN
              <br />
              Camper – 30 PLN
              <br />
              Bus – 40 PLN
              <br />
              Motorcycle – 10 PLN
            </Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkRide}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Park & Ride by the railway station.</Popup>
          </CircleMarker>
          <CircleMarker
            center={carparkJaracza}
            pathOptions={{ color: "", fillColor: carparkColor }}
            radius={carparkRadius}
          >
            <Popup>Stefana Jaracza Street parking lot.</Popup>
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
            center={entranceAuschwitz}
            zoom={14}
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
                  checked={
                    layer.anchors?.length
                      ? layer.anchors.includes(currentAnchor || "default")
                      : true
                  }
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
