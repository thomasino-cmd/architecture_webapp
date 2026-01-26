import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ProjectPanel from './ProjectPanel';
import { projects } from '../../data/projects';

// Dynamic import for Map to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
    loading: () => <div className="w-full h-full bg-[#E5DCC5] flex items-center justify-center text-[#CC6649]">Caricamento Mappa...</div>,
    ssr: false
});

const PortfolioLayout = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    const handleSelectProject = useCallback((project) => {
        setSelectedProjectId(project.id);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProjectId(null);
    }, []);

    const handleNext = useCallback(() => {
        if (!selectedProject) return;
        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % projects.length; // Loop back to start
        setSelectedProjectId(projects[nextIndex].id);
    }, [selectedProject]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#E5DCC5]">
            {/* Global Style for Map Filter */}
            <style jsx global>{`
        .leaflet-tile-pane {
            filter: sepia(100%) saturate(40%) brightness(105%) hue-rotate(10deg);
        }
        /* Hide Leaflet attribution on mobile if it covers buttons, or style it to be minimal */
        .leaflet-control-attribution {
            background: rgba(255,255,255,0.5) !important;
            font-size: 10px;
        }
      `}</style>

            {/* Map Container - moves to 50% width on desktop when busy */}
            <div className={`
        absolute top-0 right-0 h-full transition-all duration-700 ease-in-out
        ${selectedProjectId ? 'w-full md:w-1/2' : 'w-full'}
      `}>
                <MapComponent
                    projects={projects}
                    selectedProject={selectedProject}
                    onSelectProject={handleSelectProject}
                    isSplit={!!selectedProjectId}
                />

                {/* Floating Back to Home Button (Visible only when not split, or always?) */}
                {!selectedProjectId && (
                    <a
                        href="/"
                        className="absolute top-6 left-6 z-[1000] bg-white px-4 py-2 shadow-lg rounded-full text-xs font-bold tracking-widest text-gray-800 hover:text-[#CC6649] transition-colors"
                    >
                        ← HOME
                    </a>
                )}
            </div>

            {/* Project Panel */}
            <ProjectPanel
                project={selectedProject}
                isActive={!!selectedProjectId}
                onClose={handleClose}
                onNext={handleNext}
            />
        </div>
    );
};

export default PortfolioLayout;
