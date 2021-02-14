import * as React from 'react'
import './App.css';
import AppContent from './AppContent'

const MapLayersContext = React.createContext()

function MapLayersProvider(props) {
  const [mapLayers, setMapLayers] = React.useState([])
  const value = [mapLayers, setMapLayers]
  return <MapLayersContext.Provider value={value} {...props} />
}

export function useMapLayers() {
  return React.useContext(MapLayersContext)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapLayersProvider>
          <AppContent />
        </MapLayersProvider>
      </header>
    </div>
  );
}

export default App;