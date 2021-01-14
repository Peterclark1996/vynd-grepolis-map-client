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
            .then(worldData => {
                setWorldState({
                    alliances: worldData.alliances.sort((a, b) => { return b.points - a.points }).slice(0, 20),
                    players: worldData.players,
                    cities: worldData.cities,
                    islands: worldData.islands
                })
            })
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