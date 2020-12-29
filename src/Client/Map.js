import * as React from 'react'
import { MapContainer, LayersControl } from "react-leaflet";
import Call from './Api'
import Alliance from './Alliance'

function Map() {
    const [alliances, setAlliances] = React.useState([])
    const [players, setPlayers] = React.useState([])
    const [cities, setCities] = React.useState([])

    React.useEffect(() => {
        Call('alliances')
            .then(setAlliances)
        Call('players')
            .then(setPlayers)
        Call('cities')
            .then(setCities)
    }, []);

    const state = {
        alliances: alliances,
        players: players,
        cities: cities
    }

    return (
        <MapContainer center={[0, 0]} zoom={5} scrollWheelZoom={true}>
            <LayersControl position="topleft">
                {alliances.map((a) => {
                    return <Alliance key={a.id} state={state} alliance={a} />
                })}
            </LayersControl>
        </MapContainer>
    )
}

export default Map;