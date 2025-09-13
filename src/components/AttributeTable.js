// src/components/AttributeTable.js
import React, { useState } from 'react';

const AttributeTable = ({ layers, selectedFeature, onRowClick }) => {
  const [activeLayer, setActiveLayer] = useState(layers[0]?.name || '');
  
  // Get features from the active layer
  const getFeatures = () => {
    const layer = layers.find(l => l.name === activeLayer);
    if (!layer || !layer.featureGroup) return [];
    
    const features = [];
    layer.featureGroup.eachLayer(l => {
      if (l.feature) {
        features.push(l.feature);
      }
    });
    
    return features;
  };

  const features = getFeatures();
  
  if (layers.length === 0) {
    return (
      <div className="attribute-table-view">
        <div className="table-placeholder">
          <p>No layers available. Add layers to view attribute data.</p>
        </div>
      </div>
    );
  }

  // Get all property keys from features for table columns
  const getPropertyKeys = () => {
    const allKeys = new Set();
    features.forEach(feature => {
      if (feature.properties) {
        Object.keys(feature.properties).forEach(key => {
          allKeys.add(key);
        });
      }
    });
    return Array.from(allKeys);
  };

  const propertyKeys = getPropertyKeys();

  return (
    <div className="attribute-table-view">
      <div className="table-toolbar">
        <h3>Attribute Table</h3>
        <select 
          value={activeLayer} 
          onChange={(e) => setActiveLayer(e.target.value)}
        >
          {layers.filter(l => l.visible).map(layer => (
            <option key={layer.name} value={layer.name}>
              {layer.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="table-container">
        {features.length > 0 ? (
          <table className="feature-table">
            <thead>
              <tr>
                <th>#</th>
                {propertyKeys.map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={index}
                  className={
                    selectedFeature && 
                    selectedFeature.feature === feature && 
                    selectedFeature.layerName === activeLayer 
                      ? 'selected' : ''
                  }
                  onClick={() => onRowClick(feature, activeLayer)}
                >
                  <td>{index + 1}</td>
                  {propertyKeys.map(key => (
                    <td key={key}>
                      {feature.properties?.[key]?.toString() || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="table-placeholder">
            <p>No features found in the selected layer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributeTable;