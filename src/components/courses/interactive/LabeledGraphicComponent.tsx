
import React, { useState } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
}

interface LabeledGraphicContentType {
  image: string;
  hotspots: Hotspot[];
  pointStyle?: 'dots' | 'numbers' | 'letters' | 'icons';
}

interface LabeledGraphicComponentProps {
  content: LabeledGraphicContentType;
}

export const LabeledGraphicComponent: React.FC<LabeledGraphicComponentProps> = ({ content }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);

  if (!content || !content.image) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No image uploaded yet. Click edit to add an image and hotspots.</p>
      </div>
    );
  }

  const getPointDisplay = (index: number) => {
    const pointStyle = content.pointStyle || 'dots';
    
    switch (pointStyle) {
      case 'numbers':
        return (index + 1).toString();
      case 'letters':
        return String.fromCharCode(65 + index); // A, B, C, etc.
      case 'icons':
        return '●';
      case 'dots':
      default:
        return <div className="w-2 h-2 bg-white rounded-full"></div>;
    }
  };

  return (
    <div className="relative inline-block max-w-full">
      <img 
        src={content.image} 
        alt="Interactive labeled graphic" 
        className="w-full h-auto rounded-lg"
      />
      {content.hotspots?.map((hotspot, index) => (
        <button
          key={hotspot.id}
          className="absolute w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-xs font-semibold z-20"
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          onClick={() => setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)}
          onMouseEnter={() => setHoveredHotspot(hotspot)}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          {getPointDisplay(index)}
        </button>
      ))}
      
      {/* Hover Tooltip */}
      {hoveredHotspot && !selectedHotspot && (
        <div 
          className="absolute bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg z-30 pointer-events-none"
          style={{ 
            left: `${hoveredHotspot.x}%`, 
            top: `${hoveredHotspot.y}%`,
            transform: 'translate(-50%, -120%)'
          }}
        >
          <div className="font-medium">{hoveredHotspot.label}</div>
          <div className="text-xs text-gray-300 mt-1">{hoveredHotspot.description}</div>
          {/* Arrow pointing to hotspot */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      )}
      
      {/* Click Popup */}
      {selectedHotspot && (
        <div 
          className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs z-10"
          style={{ 
            left: `${selectedHotspot.x}%`, 
            top: `${selectedHotspot.y}%`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-10px'
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{selectedHotspot.label}</h3>
            <button 
              onClick={() => setSelectedHotspot(null)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-gray-700">{selectedHotspot.description}</p>
          {/* Arrow pointing to hotspot */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};
