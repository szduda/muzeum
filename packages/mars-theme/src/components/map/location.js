import { styled } from "frontity";
import L from ".leaflet";
import scope from "../theme/icons/scope.svg";
import { ScopeIcon } from "../theme";
import useGeolocation from "react-hook-geolocation";
import { Marker } from "react-leaflet";

const markerIcon = new L.Icon({
  iconUrl: scope,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

export const LocationMarker = () => {
  const location = useGeolocation();

  if (!location?.longitude || !location?.latitude) return null;

  return (
    <Marker
      icon={markerIcon}
      position={[location.latitude, location.longitude]}
    />
  );
};

export const LocateMeButton = ({ mapRef }) => {
  const location = useGeolocation();

  const showMyLocation = () => {
    if (!location) return;

    mapRef.current.flyTo(
      [location.latitude, location.longitude],
      mapRef.current.ZOOM_LEVEL,
      { animate: true }
    );
  };

  return (
    <LocateMe onClick={showMyLocation} disabled={!location}>
      <ScopeIcon />
    </LocateMe>
  );
};

const LocateMe = styled.button`
  position: fixed;
  cursor: pointer;
  right: 0.5rem;
  bottom: 5rem;
  padding: 0.25rem;
  border: 2px solid #fffff0;
  background: #fffff0;
  border-radius: 8px;
  z-index: 8;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg g,
  svg path {
    fill: #444;
  }

  :hover {
    background: #f9c959;
    border-color: #f9c959;
  }

  @media (min-width: 768px) {
    right: calc(0.5rem + 15px);
  }
`;
