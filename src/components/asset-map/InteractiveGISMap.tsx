import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { warehouseHubs } from '../../data/warehouseHubs';
import { infrastructureProjects } from '../../data/infrastructureProjects';
import { InfrastructureProject, AssetCategory } from '../../types';
import { Layers, MapPin, Truck, Warehouse, Shield, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface GISMapProps {
  onSelectProject?: (id: string) => void;
  selectedProjectId?: string | null;
  filterCat?: AssetCategory | 'all';
}

const TILE_LAYERS = {
  osm: {
    name: 'Standard OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  dark: {
    name: 'CartoDB Dark Canvas',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO'
  },
  satellite: {
    name: 'Esri Satellite Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri & GIS Community'
  }
};

// Geocoded coordinates for Regional Hubs
const HUB_COORDS: Record<string, [number, number]> = {
  'hub-adama': [8.54, 39.27],
  'hub-finfinnee': [9.03, 38.74],
  'hub-shashemene': [7.20, 38.60],
  'hub-jimma': [7.67, 36.83],
  'hub-nekemte': [9.08, 36.55],
  'hub-yabelo': [4.88, 38.08]
};

// Approximate real coordinates for Infrastructure Projects across Oromia
const PROJECT_GEOCOORDS: Record<string, [number, number]> = {
  'proj-001': [4.83, 37.80], // Borena Dillo
  'proj-002': [8.40, 39.30], // East Shewa Bora
  'proj-003': [9.05, 36.85], // East Wollega Sibu Sire
  'proj-004': [8.10, 40.00], // Arsi Sire
  'proj-005': [9.35, 42.05], // East Hararghe Babile
  'proj-006': [5.30, 39.00], // Guji Liben
  'proj-007': [7.85, 37.05], // Jimma Mana
  'proj-008': [8.80, 38.20], // West Shewa Ambo
};

const InteractiveGISMap: React.FC<GISMapProps> = ({ onSelectProject, selectedProjectId, filterCat = 'all' }) => {
  const { language, getLocalized } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeLayer, setActiveLayer] = useState<'osm' | 'dark' | 'satellite'>('dark');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [8.2, 38.8],
      zoom: 7,
      minZoom: 5,
      maxZoom: 16,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const tile = L.tileLayer(TILE_LAYERS[activeLayer].url, {
      attribution: TILE_LAYERS[activeLayer].attribution,
      maxZoom: 18,
    }).addTo(map);

    tileLayerRef.current = tile;
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newTile = L.tileLayer(TILE_LAYERS[activeLayer].url, {
      attribution: TILE_LAYERS[activeLayer].attribution,
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTile;
  }, [activeLayer]);

  // Update Markers & Convoys
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    // 1. Plot Warehouse Hubs
    warehouseHubs.forEach(hub => {
      const coords = HUB_COORDS[hub.id] || [8.54, 39.27];
      const hubIcon = L.divIcon({
        className: 'custom-hub-icon',
        html: `
          <div style="background-color: #0d6b3e; border: 2px solid #e6a117; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); cursor: pointer;">
            <span style="font-size: 16px;">🏛️</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker(coords, { icon: hubIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 180px;">
          <h4 style="font-weight: 800; margin: 0 0 4px 0; color: #0d6b3e; font-size: 13px;">${getLocalized(hub.name)}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">${hub.location}</p>
          <div style="background: #f4fbf7; padding: 6px; border-radius: 6px; font-size: 11px;">
            <div><strong>Capacity:</strong> ${hub.capacityTons.toLocaleString()} Tons</div>
            <div><strong>Grain Stock:</strong> ${hub.grainStockQtl.toLocaleString()} Qtl</div>
            <div><strong>Medical Kits:</strong> ${hub.medicalKitsCount.toLocaleString()}</div>
          </div>
          <div style="margin-top: 6px; font-size: 10px; color: #888;">Chief: ${hub.chiefCoordinator}</div>
        </div>
      `);
      markersLayerRef.current?.addLayer(marker);
    });

    // 2. Plot Infrastructure Projects
    const filtered = filterCat === 'all' ? infrastructureProjects : infrastructureProjects.filter(p => p.category === filterCat);

    filtered.forEach(proj => {
      const coords = PROJECT_GEOCOORDS[proj.id] || [8.5 + (proj.coordinates.y - 50) * 0.08, 39.0 + (proj.coordinates.x - 50) * 0.08];
      const isSelected = selectedProjectId === proj.id;

      const projIcon = L.divIcon({
        className: 'custom-proj-icon',
        html: `
          <div style="background-color: ${isSelected ? '#e6a117' : '#c91c22'}; border: 2px solid white; width: ${isSelected ? '32px' : '26px'}; height: ${isSelected ? '32px' : '26px'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4); cursor: pointer; transition: transform 0.2s;">
            <span style="font-size: ${isSelected ? '14px' : '11px'}; color: white;">📍</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(coords, { icon: projIcon });
      marker.on('click', () => {
        if (onSelectProject) onSelectProject(proj.id);
      });

      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 200px;">
          <span style="font-size: 10px; font-weight: bold; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${proj.category.replace('_', ' ')}</span>
          <h4 style="font-weight: 800; margin: 6px 0 2px 0; font-size: 13px; color: #111;">${getLocalized(proj.name)}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">${proj.zoneName} · ${proj.contractor}</p>
          <div style="margin: 6px 0; font-size: 11px;">
            <div><strong>Execution Progress:</strong> ${proj.completionPercentage}%</div>
            <div style="background: #e2e8f0; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 2px;">
              <div style="background: #0d6b3e; width: ${proj.completionPercentage}%; height: 100%;"></div>
            </div>
          </div>
          <div style="font-size: 11px; color: #333;"><strong>Beneficiaries:</strong> ${proj.beneficiariesCount.toLocaleString()}</div>
          <div style="font-size: 11px; color: #0d6b3e; font-weight: bold;">ETB ${(proj.budgetETB / 1000000).toFixed(1)}M Budget</div>
        </div>
      `);

      markersLayerRef.current?.addLayer(marker);
    });

    // 3. Draw Animated Relief Convoy Polylines (Adama HQ -> Borena, Adama -> East Hararghe)
    const convoyRoutes: { from: [number, number]; to: [number, number]; name: string }[] = [
      { from: [8.54, 39.27], to: [4.83, 37.80], name: 'Borena Drought Water Convoy' },
      { from: [8.54, 39.27], to: [9.35, 42.05], name: 'Eastern Agro-Relief Route' },
      { from: [7.20, 38.60], to: [5.30, 39.00], name: 'Guji Pastoralist Emergency Convoy' }
    ];

    convoyRoutes.forEach(r => {
      const polyline = L.polyline([r.from, r.to], {
        color: '#e6a117',
        weight: 3,
        opacity: 0.7,
        dashArray: '8, 8',
      });
      polyline.bindTooltip(r.name, { sticky: true });
      markersLayerRef.current?.addLayer(polyline);
    });

  }, [filterCat, selectedProjectId, activeLayer]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-900" style={{ height: '520px' }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700 shadow-lg text-xs text-white">
        <div className="flex items-center gap-1 text-slate-300 font-bold px-2">
          <Layers className="w-4 h-4 text-gadaa-gold" />
          <span>Layer:</span>
        </div>
        {(['dark', 'osm', 'satellite'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setActiveLayer(mode)}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              activeLayer === mode
                ? 'bg-gadaa-green text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {mode === 'dark' ? 'Dark Canvas' : mode === 'osm' ? 'Street Map' : 'Satellite'}
          </button>
        ))}
      </div>

      {/* Bottom Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-white text-xs space-y-1.5 shadow-lg hidden sm:block">
        <div className="font-bold text-slate-300 border-b border-slate-700 pb-1 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-gadaa-gold" /> GIS Operational Map Key
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-gadaa-green border border-gadaa-gold inline-block" />
          <span>Regional Logistics Hub (5 Hubs)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-gadaa-red border border-white inline-block" />
          <span>Infrastructure Project Pin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 border-t-2 border-dashed border-gadaa-gold inline-block" />
          <span>Active Relief Convoy Line</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGISMap;
