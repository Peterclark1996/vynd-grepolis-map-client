import * as React from 'react'
import { MapContainer, LayerGroup, ImageOverlay } from "react-leaflet"
import L from "leaflet"
import Alliance from './Alliance'

function Map({ world }) {
    const gridUrl = process.env.PUBLIC_URL + '/grid.png'

    return (
        <MapContainer center={[500, 500]} zoom={1} scrollWheelZoom={true} bounds={[[1000, 0], [0, 1000]]} crs={L.CRS.Simple} minZoom={0} maxZoom={10}>
            <LayerGroup>
                <ImageOverlay bounds={[[1000, 0], [0, 1000]]} url={gridUrl} />
            </LayerGroup>
            {world.alliances.map(a => {
                return <Alliance key={a.id} state={world} alliance={a} />
            })}
        </MapContainer>

    )
}

export default Map;