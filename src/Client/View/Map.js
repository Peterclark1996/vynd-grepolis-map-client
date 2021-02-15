import * as React from 'react'
import { MapContainer } from "react-leaflet"
import L from "leaflet"
import Alliance from './Alliance'
import Grid from './Grid'

function Map({ worldState, setMap }) {
    const world = {
        alliances: worldState.alliances || [],
        players: worldState.players || [],
        cities: worldState.cities || []
    }

    return (
        <MapContainer center={[500, 500]} zoom={2} scrollWheelZoom={true} bounds={[[1000, 0], [0, 1000]]} crs={L.CRS.Simple} minZoom={0} maxZoom={10} whenCreated={setMap}>
            <Grid />
            {world.alliances.map(a => {
                return <Alliance key={a.id} state={world} alliance={a} />
            })}
        </MapContainer>
    )
}

export default Map;