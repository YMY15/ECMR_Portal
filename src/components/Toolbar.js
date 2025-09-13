// src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ onBaseMapChange, currentBaseMap, onViewChange, currentView }) => {
  const baseMaps = [
    { id: 'satellite', name: 'Satellite' },
    { id: 'street', name: 'Street' },
    { id: 'terrain', name: 'Terrain' }
  ];

  const views = [
    { id: 'map', name: 'Map View' },
    { id: 'table', name: 'Table View' }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h4>Base Maps</h4>
        <div className="button-group">
          {baseMaps.map(map => (
            <button
              key={map.id}
              className={currentBaseMap === map.id ? 'active' : ''}
              onClick={() => onBaseMapChange(map.id)}
            >
              {map.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="toolbar-divider"></div>
      
      <div className="toolbar-section">
        <h4>View</h4>
        <div className="button-group">
          {views.map(view => (
            <button
              key={view.id}
              className={currentView === view.id ? 'active' : ''}
              onClick={() => onViewChange(view.id)}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;