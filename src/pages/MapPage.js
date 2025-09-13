// src/pages/MapPage.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LayerControl from '../components/LayerControl';
import Toolbar from '../components/Toolbar';
import Legend from '../components/Legend';
import AttributeTable from '../components/AttributeTable';
import './MapPage.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapPage = () => {
  const mapInstance = useRef(null);
  const [layers, setLayers] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [baseMap, setBaseMap] = useState('satellite');
  const [view, setView] = useState('map');
  const [loadedLayers, setLoadedLayers] = useState(new Set()); // ✅ Prevent duplicates

  // Base maps
  const baseMaps = {
    satellite: L.tileLayer(
      'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '&copy; Google Satellite' }
    ),
    street: L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
    )
  };

  // Style for features
  const getStyleForFeature = (feature) => {
    if (feature.properties && feature.properties.type) {
      switch (feature.properties.type) {
        case 'Ore Type A': return { color: 'red', weight: 3, fillOpacity: 0.7, fillColor: 'red' };
        case 'Ore Type B': return { color: 'blue', weight: 3, fillOpacity: 0.7, fillColor: 'blue' };
        case 'Ore Type C': return { color: 'green', weight: 3, fillOpacity: 0.7, fillColor: 'green' };
        default: return { color: 'orange', weight: 3, fillOpacity: 0.7, fillColor: 'orange' };
      }
    }
    return { color: 'purple', weight: 3, fillOpacity: 0.7, fillColor: 'purple' };
  };

  // Load GeoJSON layer
  const loadGeoJSONLayer = useCallback(async (filename) => {
    if (loadedLayers.has(filename)) return; // ✅ already loaded, skip

    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/${filename}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const geojson = await response.json();

      if (!geojson || !geojson.features) return;

      const featureGroup = L.featureGroup();

      const layer = L.geoJSON(geojson, {
        style: getStyleForFeature,
        pointToLayer: (feature, latlng) =>
          L.circleMarker(latlng, {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }),
        onEachFeature: (feature, layer) => {
          let popupContent = '<div><h4>' + (feature.properties?.name || 'Feature') + '</h4><table>';
          for (const key in feature.properties) {
            popupContent += `<tr><th>${key}</th><td>${feature.properties[key]}</td></tr>`;
          }
          popupContent += '</table></div>';
          layer.bindPopup(popupContent, { maxWidth: 300 });

          layer.on('click', (e) => {
            setSelectedFeature({ feature, layerName: filename });
            if (e.target.setStyle) {
              e.target.setStyle({
                weight: 5,
                color: '#fffa24',
                opacity: 1,
                fillOpacity: 0.9
              });
            }
          });

          featureGroup.addLayer(layer);
        },
      });

      // ✅ Clean name (remove .geojson)
      const displayName = filename.replace(/\.geojson$/i, "");

      // ✅ Prevent duplicates
      setLayers(prev => {
        if (prev.some(l => l.name === displayName)) return prev;
        return [...prev, { name: displayName, layer, featureGroup, visible: false, type: "geojson" }];
      });

      setLoadedLayers(prev => new Set(prev).add(filename));

    } catch (error) {
      console.error('Failed to load GeoJSON:', filename, error);
    }
  }, [loadedLayers]);

  // Toggle layer visibility
  const toggleLayer = useCallback((layerName) => {
    const layerObj = layers.find(l => l.name === layerName);
    if (!layerObj || !mapInstance.current) return;

    if (layerObj.visible) {
      mapInstance.current.removeLayer(layerObj.layer);
      setActiveLayers(prev => prev.filter(name => name !== layerName));
    } else {
      mapInstance.current.addLayer(layerObj.layer);
      setActiveLayers(prev => [...prev, layerName]);
    }

    setLayers(prev => prev.map(layer =>
      layer.name === layerName ? { ...layer, visible: !layer.visible } : layer
    ));
  }, [layers]);

  // Change base map
  const changeBaseMap = useCallback((mapType) => {
    if (!mapInstance.current) return;

    mapInstance.current.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        mapInstance.current.removeLayer(layer);
      }
    });

    baseMaps[mapType].addTo(mapInstance.current);
    setBaseMap(mapType);
  }, []);

  // Init map
  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map('map', {
        center: [26.5, 33.5],
        zoom: 6,
        zoomControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(mapInstance.current);
      L.control.scale({ position: 'bottomleft' }).addTo(mapInstance.current);

      baseMaps.satellite.addTo(mapInstance.current);

      // ✅ Load only once
      const initialLayers = ['ores.geojson', 'mines.geojson', 'AOI.geojson'];
      initialLayers.forEach(layer => loadGeoJSONLayer(layer));
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [loadGeoJSONLayer]);

  return (
    <div className="map-page">
      <div id="map" className="map-container"></div>

      {/* ✅ Top-left card with Toolbar */}
      <div className="map-top-left-card">
        <Toolbar
          onBaseMapChange={changeBaseMap}
          currentBaseMap={baseMap}
          onViewChange={setView}
          currentView={view}
        />
      </div>

      {/* ✅ Layer control shows cleaned names */}
      <LayerControl
        layers={layers}
        onToggleLayer={toggleLayer}
        onAddLayer={loadGeoJSONLayer}
        activeLayers={activeLayers}
      />

      <Legend layers={layers} />

      {view === 'table' && (
        <AttributeTable
          layers={layers.filter(l => l.visible)}
          selectedFeature={selectedFeature}
          onRowClick={(feature, layerName) => {
            setSelectedFeature({ feature, layerName });
            const layerObj = layers.find(l => l.name === layerName);
            if (layerObj && layerObj.featureGroup) {
              layerObj.featureGroup.eachLayer(layer => {
                if (layer.feature === feature) {
                  const latlng = layer.getBounds ? layer.getBounds().getCenter() : layer.getLatLng();
                  mapInstance.current.setView(latlng, 15);
                  layer.openPopup();
                }
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default MapPage;
