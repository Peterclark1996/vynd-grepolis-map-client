import * as React from 'react'

const MapLayersContext = React.createContext()

export function MapLayersProvider(props) {
    const [mapLayers, setMapLayers] = React.useState([])
    const value = [mapLayers, setMapLayers]
    return <MapLayersContext.Provider value={value} {...props} />
}

export function useMapLayers() {
    return React.useContext(MapLayersContext)
}