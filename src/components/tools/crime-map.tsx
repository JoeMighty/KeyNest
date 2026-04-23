"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CrimeMapProps {
  lat: number;
  lng: number;
  crimes: any[];
}

export default function CrimeMap({ lat, lng, crimes }: CrimeMapProps) {
  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border-2 border-primary/10 shadow-inner bg-muted/20">
      <MapContainer 
        center={[lat, lng]} 
        zoom={15} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Main Location Marker */}
        <Marker position={[lat, lng]}>
          <Popup>
            Search Center Point
          </Popup>
        </Marker>

        {/* General Area Circle */}
        <Circle 
          center={[lat, lng]} 
          radius={500} 
          pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue', weight: 1, dashArray: '5, 10' }} 
        />

        {/* Individual Crime Point approximations (Top 50 for performance) */}
        {crimes.slice(0, 50).map((crime, idx) => (
          <Circle
            key={idx}
            center={[parseFloat(crime.location.latitude), parseFloat(crime.location.longitude)]}
            radius={20}
            pathOptions={{ 
              fillColor: 'red', 
              fillOpacity: 0.4, 
              color: 'red', 
              weight: 1 
            }}
          >
            <Popup>
              <div className="p-1">
                <p className="font-bold text-xs mb-1">{crime.category.replace(/-/g, ' ')}</p>
                <p className="text-[10px] text-muted-foreground">Location: {crime.location.street.name}</p>
                <p className="text-[10px] text-muted-foreground">Outcome: {crime.outcome_status?.category || 'Under investigation'}</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
