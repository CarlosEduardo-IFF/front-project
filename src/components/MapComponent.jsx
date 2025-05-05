import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para ícones faltando no Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ locations = [], latitude = null, longitude = null }) => {
  const [activeLocation, setActiveLocation] = useState(null);
  const mapRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 0);
    }
  }, [isMounted, latitude, longitude]);

  const getMapCenter = () => {
    if (latitude && longitude) return [latitude, longitude];
    if (locations.length === 0) return [-15.788497, -47.879873];
    
    const validLocs = locations.filter(loc => 
      !isNaN(loc.latitude) && 
      !isNaN(loc.longitude) &&
      Math.abs(loc.latitude) <= 90 &&
      Math.abs(loc.longitude) <= 180
    );

    if (validLocs.length === 0) return [-15.788497, -47.879873];
    
    return [validLocs[0].latitude, validLocs[0].longitude];
  };

  return (
    <div className="relative w-full h-full" style={{ zIndex: 10 }}>
      <MapContainer 
        center={getMapCenter()} 
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
        ref={mapRef}
        whenCreated={(map) => {
          mapRef.current = map;
          setTimeout(() => map.invalidateSize(), 0);
        }}
        style={{ borderRadius: '12px', overflow: 'hidden' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            position={[location.latitude, location.longitude]}
            eventHandlers={{
              click: () => setActiveLocation(location),
            }}
          />
        ))}
        
        {activeLocation && (
          <Popup
            position={[activeLocation.latitude, activeLocation.longitude]}
            onClose={() => setActiveLocation(null)}
          >
            <div className="p-2 min-w-[150px]">
              <h3 className="m-0 font-bold text-sm">{activeLocation.street}</h3>
              <div className="mt-1 text-xs">
                <div>Lat: {activeLocation.latitude.toFixed(4)}</div>
                <div>Lng: {activeLocation.longitude.toFixed(4)}</div>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;