import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
if (typeof window !== 'undefined') {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
    });
}

const customIcon = new L.Icon({
    iconUrl: '/icons/pin.svg',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
});

// Piazza Alimonda, Genova Coordinates
const POSITION = [44.4056, 8.9463];

export default function FixedMap() {
    return (
        <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 shadow-inner">
            <MapContainer
                center={POSITION}
                zoom={16}
                scrollWheelZoom={false} // Disable scroll zoom for "fixed" feel
                dragging={false} // Disable dragging for "fixed" feel, as requested
                doubleClickZoom={false}
                zoomControl={false}
                className="w-full h-full outline-none z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="sepia-map" // Reusing the sepia class from MapComponent
                />

                <Marker position={POSITION} icon={customIcon} />
            </MapContainer>

            {/* Overlay for "View on Google Maps" or similar interaction if needed, 
                or just a purely visual element since user asked for "fixed". */}
        </div>
    );
}
