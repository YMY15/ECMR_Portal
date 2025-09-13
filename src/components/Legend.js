// src/components/Legend.js
import React, { useState } from 'react';

const Legend = ({ layers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Get legend items grouped by layer type
  const getLegendItems = () => {
    const itemsByLayer = {};
    
    layers.filter(layer => layer.visible).forEach(layer => {
      if (!itemsByLayer[layer.name]) {
        itemsByLayer[layer.name] = {
          name: layer.name,
          type: layer.type,
          items: []
        };
      }

      // Add layer-specific items
      if (layer.type === 'geojson' && layer.featureGroup) {
        // Get unique styles from this layer
        const uniqueStyles = new Map();
        
        layer.featureGroup.eachLayer(layer => {
          if (layer.feature && layer.feature.properties) {
            const props = layer.feature.properties;
            const styleKey = props.type || props.mineral || props.status || 'default';
            
            if (!uniqueStyles.has(styleKey)) {
              let color, shape;
              
              // Determine color based on properties
              if (props.type === 'Ore Type A') {
                color = 'red';
                shape = 'rectangle';
              } else if (props.type === 'Ore Type B') {
                color = 'blue';
                shape = 'rectangle';
              } else if (props.type === 'Ore Type C') {
                color = 'green';
                shape = 'rectangle';
              } else if (props.mineral === 'Gold') {
                color = '#FFD700';
                shape = 'circle';
              } else if (props.mineral === 'Copper') {
                color = '#B87333';
                shape = 'circle';
              } else if (props.mineral === 'Iron') {
                color = '#A9A9A9';
                shape = 'circle';
              } else if (props.mineral === 'Zinc') {
                color = '#7EB6FF';
                shape = 'circle';
              } else if (props.mineral === 'Silver') {
                color = '#C0C0C0';
                shape = 'circle';
              } else if (props.status === 'Active') {
                color = '#4CAF50';
                shape = 'rectangle';
              } else if (props.status === 'Development') {
                color = '#FF9800';
                shape = 'rectangle';
              } else if (props.status === 'Exploration') {
                color = '#2196F3';
                shape = 'rectangle';
              } else {
                color = 'gray';
                shape = 'rectangle';
              }

              uniqueStyles.set(styleKey, {
                label: styleKey,
                color: color,
                shape: shape,
                count: 1
              });
            }
          }
        });

        // Convert map to array
        itemsByLayer[layer.name].items = Array.from(uniqueStyles.values());
      }
    });

    return itemsByLayer;
  };

  const legendData = getLegendItems();
  const hasVisibleLayers = Object.keys(legendData).length > 0;

  if (!hasVisibleLayers) {
    return (
      <div className="legend">
        <div className="legend-header" onClick={() => setIsOpen(!isOpen)}>
          <h4>Legend</h4>
          <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <div className="legend-content">
            <p className="no-layers-message">No visible layers</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="legend">
      <div className="legend-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>Legend</h4>
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="legend-content">
          {Object.entries(legendData).map(([layerName, layerData]) => (
            <div key={layerName} className="legend-layer">
              <div 
                className="legend-layer-header"
                onClick={() => toggleCategory(layerName)}
              >
                <h5>{layerName}</h5>
                <span className="toggle-icon">
                  {expandedCategories[layerName] ? '▲' : '▼'}
                </span>
              </div>
              
              {expandedCategories[layerName] && (
                <div className="legend-items">
                  {layerData.items.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-symbol">
                        {item.shape === 'circle' ? (
                          <div 
                            className="legend-circle"
                            style={{ backgroundColor: item.color }}
                          ></div>
                        ) : (
                          <div 
                            className="legend-rectangle"
                            style={{ 
                              backgroundColor: item.color,
                              border: `2px solid ${item.color}`
                            }}
                          ></div>
                        )}
                      </div>
                      <span className="legend-label">{item.label}</span>
                      {item.count && <span className="legend-count">({item.count})</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Default symbols legend */}
          <div className="legend-layer">
            <div 
              className="legend-layer-header"
              onClick={() => toggleCategory('defaultSymbols')}
            >
              <h5>Map Symbols</h5>
              <span className="toggle-icon">
                {expandedCategories['defaultSymbols'] ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedCategories['defaultSymbols'] && (
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-symbol">
                    <div className="legend-circle" style={{ backgroundColor: '#ff7800' }}></div>
                  </div>
                  <span className="legend-label">Mine Locations</span>
                </div>
                <div className="legend-item">
                  <div className="legend-symbol">
                    <div className="legend-rectangle" style={{ backgroundColor: 'red' }}></div>
                  </div>
                  <span className="legend-label">Ore Deposits</span>
                </div>
                <div className="legend-item">
                  <div className="legend-symbol">
                    <div className="legend-rectangle" style={{ 
                      backgroundColor: 'transparent', 
                      border: '2px dashed blue' 
                    }}></div>
                  </div>
                  <span className="legend-label">Area of Interest</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;