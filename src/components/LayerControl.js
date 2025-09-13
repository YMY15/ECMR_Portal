// src/components/LayerControl.js
import React, { useState } from 'react';

const LayerControl = ({ layers, onToggleLayer, onAddLayer, activeLayers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newLayerUrl, setNewLayerUrl] = useState('');
  const [existingLayers, setExistingLayers] = useState(new Set());

  const handleAddLayer = () => {
    if (newLayerUrl.trim()) {
      // Extract filename from URL to check for duplicates
      const filename = newLayerUrl.split('/').pop();
      
      // Check if layer already exists
      if (layers.some(layer => layer.name === filename)) {
        alert('This layer is already loaded!');
        return;
      }
      
      onAddLayer(newLayerUrl.trim());
      setNewLayerUrl('');
    }
  };

  return (
    <div className="layer-control">
      <div className="layer-control-header">
        <h3>Layers</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      
      {isOpen && (
        <>
          <div className="layer-list">
            {layers.map((layer, idx) => (
              <div key={`layer-${idx}-${layer.name}`} className="layer-item">
                <input
                  type="checkbox"
                  id={`layer-${idx}-${layer.name}`}
                  checked={activeLayers.includes(layer.name)}
                  onChange={() => onToggleLayer(layer.name)}
                />
                <label htmlFor={`layer-${idx}-${layer.name}`} className="layer-label">
                  {layer.name}
                </label>
                <span className="layer-color-indicator"></span>
              </div>
            ))}
          </div>
          
          <div className="add-layer-section">
            <h4>Add Layer from URL</h4>
            <div className="add-layer-input">
              <input
                type="text"
                placeholder="Enter GeoJSON URL"
                value={newLayerUrl}
                onChange={(e) => setNewLayerUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLayer()}
              />
              <button onClick={handleAddLayer}>Add</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LayerControl;