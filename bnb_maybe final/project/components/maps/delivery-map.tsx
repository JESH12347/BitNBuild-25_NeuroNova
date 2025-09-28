'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliveryPoints = [
  { id: 1, name: 'Acme Corp', position: [28.6139, 77.2090], orders: 25 },
  { id: 2, name: 'Tech Solutions', position: [28.6129, 77.2295], orders: 15 },
  { id: 3, name: 'Design Studio', position: [28.5355, 77.3910], orders: 8 },
  { id: 4, name: 'Marketing Hub', position: [28.4595, 77.0266], orders: 12 },
  { id: 5, name: 'Business Center', position: [28.7041, 77.1025], orders: 18 },
];

const optimizedRouteCoords = [
  [28.6139, 77.2090],
  [28.6129, 77.2295],
  [28.5355, 77.3910],
  [28.4595, 77.0266],
  [28.7041, 77.1025],
];

interface DeliveryMapProps {
  optimizedRoute: boolean;
}

export default function DeliveryMap({ optimizedRoute }: DeliveryMapProps) {
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {deliveryPoints.map((point) => (
          <Marker key={point.id} position={point.position as [number, number]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">{point.name}</h3>
                <p className="text-sm text-gray-600">{point.orders} orders</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {optimizedRoute && (
          <Polyline
            positions={optimizedRouteCoords as [number, number][]}
            color="blue"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
}