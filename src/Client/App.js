import * as React from 'react'
import './App.css';
import AppContent from './AppContent'
import * as MapLayers from './Context/MapLayerContext'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapLayers.MapLayersProvider>
          <AppContent />
        </MapLayers.MapLayersProvider>
      </header>
    </div>
  );
}

export default App;