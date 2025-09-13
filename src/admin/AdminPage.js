// src/pages/AdminPage.js
import React, { useState } from 'react';
import { useAdminMapController } from '../admin/AdminMapController';

const AdminPage = () => {
  const { layers, addLayer, removeLayer, clearLayers } = useAdminMapController();
  const [file, setFile] = useState(null);
  const [layerName, setLayerName] = useState('');
  const [color, setColor] = useState('#3388ff');
  const [opacity, setOpacity] = useState(0.5);

  const handleUpload = (e) => setFile(e.target.files[0]);

  const handleAddLayer = () => {
    if (!file || !layerName) return alert('Layer name and file required');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geojson = JSON.parse(e.target.result);
        addLayer(layerName, geojson, color, opacity);
        setLayerName('');
        setFile(null);
      } catch (err) {
        alert('Invalid GeoJSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Map Panel</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Layer Name"
          value={layerName}
          onChange={e => setLayerName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input type="file" accept=".geojson,application/json" onChange={handleUpload} className="mr-2"/>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="mr-2"/>
        <input type="number" value={opacity} min="0" max="1" step="0.1" onChange={e => setOpacity(parseFloat(e.target.value))} className="mr-2 w-16"/>
        <button onClick={handleAddLayer} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Add Layer</button>
      </div>

      <div>
        <h3 className="font-bold mb-2">Existing Layers:</h3>
        {layers.map(layer => (
          <div key={layer.name} className="flex items-center justify-between mb-1">
            <span>{layer.name}</span>
            <button onClick={() => removeLayer(layer.name)} className="text-red-500 hover:underline">Remove</button>
          </div>
        ))}
        {layers.length > 0 && (
          <button onClick={clearLayers} className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">Clear All</button>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
