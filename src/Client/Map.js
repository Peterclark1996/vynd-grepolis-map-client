import * as React from 'react'
import { MapContainer, LayersControl } from "react-leaflet"
import L from "leaflet"
import Call from './Api'
import Alliance from './Alliance'

function Map({ world }) {
    const [worldState, setWorldState] = React.useState({
        alliances: [],
        players: [],
        cities: []
    })

    React.useEffect(() => {
        if (world == null || world.name == null || world.code == null) return
        Call('getWorldData', { world: world.code })
            .then(worldData => {
                setWorldState({
                    alliances: worldData.alliances,
                    players: worldData.players,
                    cities: worldData.cities
                })
            })
    }, [world]);

    return (
        <MapContainer center={[500, 500]} zoom={1} scrollWheelZoom={true} bounds={[[1000, 0], [0, 1000]]} crs={L.CRS.Simple} minZoom={0} maxZoom={10}>
            <LayersControl position="topleft">
                {worldState.alliances.map(a => {
                    return <Alliance key={a.id} state={worldState} alliance={a} />
                })}
            </LayersControl>
        </MapContainer>
    )
}

export default Map;