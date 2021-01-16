import * as React from 'react'
import { Circle, Popup } from "react-leaflet";
import { GetCityOffsetForIsland } from './IslandSpots'

const cityOffsetRatio = 0.006

function City({ state, city, player, alliance }) {

    const island = state.islands.filter(i => i.x === city.islandX && i.y === city.islandY)[0]
    const offset = GetCityOffsetForIsland(island.islandType, city.posOnIsland)

    return (
        <Circle center={[city.islandX + offset.x * cityOffsetRatio, city.islandY + offset.x * cityOffsetRatio]} color={alliance.colour} radius={200}>
            <Popup>
                {city.name}<br />
                {player.name}<br />
                {alliance.name}<br />
            </Popup>
        </Circle>
    )
}

export default City;