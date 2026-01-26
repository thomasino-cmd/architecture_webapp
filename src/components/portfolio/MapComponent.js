import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js (though we use custom icon mostly)
// We wrap this in a check to run only on client
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

// Component to handle map movement
const MapController = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, zoom, {
            duration: 2,
            easeLinearity: 0.25
        });
    }, [center, zoom, map]);

    return null;
};

// Component to invalidate size when layout changes (Split Screen)
const ResizeHandler = ({ isSplit }) => {
    const map = useMap();
    useEffect(() => {
        // Invalidate quickly to prevent gray areas, but also after transition
        const timer1 = setTimeout(() => map.invalidateSize(), 100);
        const timer2 = setTimeout(() => map.invalidateSize(), 600);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, [isSplit, map]);
    return null;
}

const MapComponent = ({ projects, selectedProject, onSelectProject, isSplit }) => {
    const defaultCenter = [44.4056, 8.9463]; // Genova
    // If split, we might want to offset the center? 
    // For now, simple centering is fine as requested.
    const center = selectedProject ? selectedProject.position : defaultCenter;
    const zoom = selectedProject ? 16 : 13;

    return (
        <div className="relative w-full h-full bg-[#E5DCC5]">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                className="w-full h-full outline-none z-0"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="sepia-map"
                />

                {projects.map((project) => (
                    <Marker
                        key={project.id}
                        position={project.position}
                        icon={customIcon}
                        eventHandlers={{
                            click: () => onSelectProject(project),
                        }}
                    />
                ))}

                <MapController center={center} zoom={zoom} />
                <ResizeHandler isSplit={isSplit} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
