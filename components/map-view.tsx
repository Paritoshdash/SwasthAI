// components/map-view.tsx

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This is the same icon fix from before
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define the types for props
interface Hospital {
  id: number;
  name: string;
  lat: number;
  lon: number;
  phone: string | null;
}

interface MapViewProps {
  location: { lat: number; lon: number };
  hospitals: Hospital[];
}

export default function MapView({ location, hospitals }: MapViewProps) {
  return (
    <MapContainer 
      center={[location.lat, location.lon]} 
      zoom={13} 
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User's Location Marker */}
      <Marker position={[location.lat, location.lon]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Hospital Markers */}
      {hospitals.map(hospital => (
         <Marker key={hospital.id} position={[hospital.lat, hospital.lon]}>
            <Popup>
                <b>{hospital.name}</b>
                {hospital.phone && <br />}
                {hospital.phone && `Phone: ${hospital.phone}`}
            </Popup>
         </Marker>
      ))}
    </MapContainer>
  );
}