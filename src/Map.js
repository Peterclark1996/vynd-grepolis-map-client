import * as React from 'react'
import { MapContainer, LayersControl, LayerGroup, Circle, Popup } from "react-leaflet";

function Map() {
    const [alliances, setAlliances] = React.useState([])
    const [players, setPlayers] = React.useState([])
    const [cities, setCities] = React.useState([])

    React.useEffect(() => {
        setAlliances(
            [{
                id: 0,
                name: "Alliance name 1",
                points: 99999,
                colour: "#8B5A00"
            }, {
                id: 1,
                name: "Alliance name 2",
                points: 55599,
                colour: "#FF0000"
            }]
        )
        setPlayers(
            [{
                id: 0,
                name: "Player 1",
                alliance: 0,
                points: 99999
            }, {
                id: 1,
                name: "Player 2",
                alliance: 1,
                points: 55599
            }]
        )
        setCities(
            [{
                id: 0,
                name: "City name 1",
                player: 0,
                points: 3123,
                x: 0,
                y: 5
            }, {
                id: 1,
                name: "City name 2",
                player: 0,
                points: 7235,
                x: 5,
                y: 0
            }, {
                id: 2,
                name: "City name 3",
                player: 1,
                points: 11111,
                x: 3,
                y: 3
            }]
        )
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

function Alliance({ state, alliance }) {
    return (
        <LayersControl.Overlay checked name={alliance.name}>
            <LayerGroup>
                {
                    state.players
                        .filter((p) => p.alliance === alliance.id)
                        .map((p) => {
                            return <Player key={p.id} state={state} player={p} alliance={alliance} />
                        })
                }
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

function Player({ state, player, alliance }) {
    return (
        <>
            {
                state.cities
                    .filter((c) => c.player === player.id)
                    .map((c) => {
                        return <City key={c.id} city={c} player={player} alliance={alliance} />
                    })
            }
        </>
    )
}

function City({ city, player, alliance }) {
    return (
        <Circle center={[city.x, city.y]} color={alliance.colour} radius={200}>
            <Popup>
                {city.name}<br />
                {player.name}<br />
                {alliance.name}<br />
            </Popup>
        </Circle>
    )
}

export default Map;