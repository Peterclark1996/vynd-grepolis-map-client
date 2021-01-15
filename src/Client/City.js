import * as React from 'react'
import { Circle, Popup } from "react-leaflet";

function City({ city, player, alliance }) {
    return (
        <Circle center={[city.islandX, city.islandY]} color={alliance.colour} radius={200}>
            <Popup>
                {city.name}<br />
                {player.name}<br />
                {alliance.name}<br />
            </Popup>
        </Circle>
    )
}

export default City;