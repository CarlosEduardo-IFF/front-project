import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Configuração CORRETA dos ícones (solução definitiva)
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = ({ locations = [] }) => {
  const [activeLocation, setActiveLocation] = useState(null);

  // Função para calcular o centro do mapa
  const getMapCenter = () => {
    if (locations.length === 0) return [-21.759905208416814, -41.31165564981896]; // Centro de campos
    
    const validLocs = locations.filter(loc => 
      !isNaN(loc.latitude) && 
      !isNaN(loc.longitude) &&
      Math.abs(loc.latitude) <= 90 &&
      Math.abs(loc.longitude) <= 180
    );

    if (validLocs.length === 0) return [-15.788497, -47.879873];

    const avgLat = validLocs.reduce((sum, loc) => sum + loc.latitude, 0) / validLocs.length;
    const avgLng = validLocs.reduce((sum, loc) => sum + loc.longitude, 0) / validLocs.length;
    
    return [avgLat, avgLng];
  };

  return (
    <div style={{ height: '500px', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={getMapCenter()} 
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
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
            <div style={{ padding: '10px', minWidth: '200px' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold' }}>{activeLocation.name}</h3>
              <div style={{ marginTop: '5px', fontSize: '14px' }}>
                <div>Latitude: {activeLocation.latitude.toFixed(6)}</div>
                <div>Longitude: {activeLocation.longitude.toFixed(6)}</div>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;