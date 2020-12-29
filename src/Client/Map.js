import * as React from 'react'
import { MapContainer, LayersControl } from "react-leaflet";
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

        const alliancesPromise = Call('alliances', { world: world.code })
        const playersPromise = Call('players', { world: world.code })
        const citiesPromise = Call('cities', { world: world.code })

        Promise.all([alliancesPromise, playersPromise, citiesPromise])
            .then(values => {
                setWorldState({
                    alliances: values[0],
                    players: values[1],
                    cities: values[2]
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