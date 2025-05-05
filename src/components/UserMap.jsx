import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Ícone personalizado para o usuário (3 camadas: ponto, borda branca, aro azul)
const userIcon = new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width: 28px;
        height: 28px;
      ">
        <!-- Aro externo azul transparente (borda mais fina) -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(51, 136, 255, 0.3);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.8);
        "></div>
        
        <!-- Borda branca (mais fina) -->
        <div style="
          position: absolute;
          top: 5px;
          left: 5px;
          width: 18px;
          height: 18px;
          background-color: white;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.9);
        "></div>
        
        <!-- Ponto central azul (ligeiramente menor) -->
        <div style="
          position: absolute;
          top: 8px;
          left: 8px;
          width: 12px;
          height: 12px;
          background-color: #3388ff;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: '',
    iconSize: [28, 28],  // Tamanho total reduzido
    iconAnchor: [14, 14], // Ajuste proporcional
    popupAnchor: [0, -14]
  });

// Ícone vermelho padrão para outras localizações (mantido original)
const locationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const UserMap = ({ latitude, longitude, locations = [] }) => {
  const isValidCoord = (lat, lng) => 
    lat !== undefined && lng !== undefined && 
    !isNaN(lat) && !isNaN(lng) && 
    Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  
  const hasValidUserPosition = isValidCoord(latitude, longitude);
  const defaultCenter = [-21.762134416934877, -41.32013515699373]; 
  const center = hasValidUserPosition ? [latitude, longitude] : defaultCenter;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {hasValidUserPosition && (
          <Marker position={center} icon={userIcon}>
            <Popup>
              <div style={{ padding: '10px', minWidth: '200px' }}>
                <h3 style={{ margin: 0, fontWeight: 'bold' }}>Sua Localização</h3>
                <div style={{ marginTop: '5px', fontSize: '14px' }}>
                  <div>Latitude: {latitude.toFixed(6)}</div>
                  <div>Longitude: {longitude.toFixed(6)}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {locations.filter(loc => isValidCoord(loc.address?.latitude, loc.address?.longitude)).map((location, index) => (
          <Marker
            key={`marker-${location.id || index}`}
            position={[location.address.latitude, location.address.longitude]}
            icon={locationIcon}
          >
            <Popup>
              <div style={{ padding: '10px', minWidth: '200px' }}>
                <h3 style={{ margin: 0, fontWeight: 'bold' }}>{location.name}</h3>
                <div style={{ marginTop: '5px', fontSize: '14px' }}>
                  <div>Endereço: {location.address.street}</div>
                  <div>Cidade: {location.address.city}, {location.address.state}</div>
                  <div>CEP: {location.address.zipCode}</div>
                  <div>Latitude: {location.address.latitude.toFixed(6)}</div>
                  <div>Longitude: {location.address.longitude.toFixed(6)}</div>
                </div>
                {location.description && (
                  <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                    {location.description}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default UserMap;