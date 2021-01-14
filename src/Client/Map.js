import * as React from 'react'
import { MapContainer, LayersControl } from "react-leaflet";
import Call from './Api'
import Alliance from './Alliance'

function Map({ world }) {
    const [worldState, setWorldState] = React.useState({
        alliances: [],
        players: [],
        cities: [],
        islands: []
    })

    React.useEffect(() => {
        if (world == null || world.name == null || world.code == null) return
        Call('getWorldData', { world: world.code })
            .then(worldData => setWorldState(worldData))
    }, [world]);

    return (
        <MapContainer center={[0, 0]} zoom={5} scrollWheelZoom={true}>
            <LayersControl position="topleft">
                {worldState.alliances.map((a) => {
                    return <Alliance key={a.id} state={worldState} alliance={a} />
                })}
            </LayersControl>
        </MapContainer>
    )
}

export default Map;