// src/admin/AdminMapController.js
import { useState } from 'react';

// Admin hook to manage map layers
export const useAdminMapController = () => {
  const [layers, setLayers] = useState([]);

  // Add a new GeoJSON layer
  const addLayer = (name, geojson, color = '#3388ff', opacity = 0.5) => {
    setLayers(prev => [...prev, { name, geojson, color, opacity }]);
  };

  // Remove a layer by name
  const removeLayer = (name) => {
    setLayers(prev => prev.filter(layer => layer.name !== name));
  };

  // Clear all layers
  const clearLayers = () => {
    setLayers([]);
  };

  return { layers, addLayer, removeLayer, clearLayers };
};
