// src/pages/MapPage.js
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet-measure';
import 'leaflet-measure/dist/leaflet-measure.css';
import 'leaflet-search';
import 'leaflet-search/dist/leaflet-search.src.css';

const MapPage = () => {
  const mapInstance = useRef(null);
  const [layers, setLayers] = useState([]);

  const loadGeoJSONLayer = async (filename) => {
    if (layers.find(l => l.name === filename)) return; // prevent duplicates
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/${filename}`);
      const geojson = await response.json();

      // Create a separate feature group for this layer
      const featureGroup = L.featureGroup();

      const layer = L.geoJSON(geojson, {
        onEachFeature: (feature, layer) => {
          let popupContent = '<table>';
          for (const key in feature.properties) {
            popupContent += `<tr><th>${key}</th><td>${feature.properties[key]}</td></tr>`;
          }
          popupContent += '</table>';
          layer.bindPopup(popupContent);
          featureGroup.addLayer(layer);
        },
      });

      layer.addTo(mapInstance.current); // add to map
      setLayers(prev => [...prev, { name: filename, layer, featureGroup }]);

      // Add search control specific to this layer
      const searchControl = new L.Control.Search({
        layer: featureGroup,
        propertyName: 'name', // adjust to your property
        marker: false,
        moveToLocation: (latlng, title, map) => {
          map.setView(latlng, 12);
        },
      });
      searchControl.addTo(mapInstance.current);

    } catch (error) {
      console.error('Failed to load GeoJSON:', filename, error);
    }
  };

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map('map', {
        center: [26.5, 33.5], // Eastern Desert center
        zoom: 6,
        fullscreenControl: true,
      });

      // Satellite base map
      L.tileLayer(
        'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '&copy; Google Satellite' }
      ).addTo(mapInstance.current);

      // Measure tool
      L.control.measure({
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares',
      }).addTo(mapInstance.current);

      // Legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend bg-white p-2 shadow rounded');
        div.innerHTML += '<h4>Legend</h4>';
        div.innerHTML += '<i style="background: red"></i> Ore Type A<br>';
        div.innerHTML += '<i style="background: blue"></i> Ore Type B<br>';
        return div;
      };
      legend.addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const toggleLayer = (layerName) => {
    const layerObj = layers.find(l => l.name === layerName);
    if (!layerObj || !mapInstance.current) return;

    if (mapInstance.current.hasLayer(layerObj.layer)) {
      mapInstance.current.removeLayer(layerObj.layer);
    } else {
      mapInstance.current.addLayer(layerObj.layer);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div id="map" style={{ height: '100%', width: '100%' }}></div>

      <div className="absolute top-4 right-4 bg-white p-4 shadow rounded" style={{ zIndex: 1000 }}>
        <h4 className="font-bold mb-2">Layers</h4>
        {layers.map((l, idx) => (
          <div key={`layer-${idx}`}>
            <input
              type="checkbox"
              id={`layer-${idx}`}
              defaultChecked
              onChange={() => toggleLayer(l.name)}
            />
            <label htmlFor={`layer-${idx}`} className="ml-2">{l.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
