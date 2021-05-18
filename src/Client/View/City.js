import * as React from 'react'
import { Circle, Tooltip } from "react-leaflet"
import IconTown from "../Images/icon_town.png"
import IconPlayer from "../Images/icon_player.png"
import IconPoints from "../Images/icon_points.png"
import IconAlliance from "../Images/icon_ally.png"

function City({ city, player, alliance }) {
    return (
        <Circle center={[city.x, city.y]} color={alliance.colour} radius={city.size}>
            <Tooltip>
                <Tag icon={IconTown} value={city.name} key='town' />
                <Tag icon={IconPlayer} value={player.name} key='player' />
                <Tag icon={IconPoints} value={city.points} key='points' />
                <Tag icon={IconAlliance} value={alliance.name} key='alliance' />
            </Tooltip>
        </Circle>
    )
}

function Tag({ icon, value }) {
    if (!value) return (<></>)
    return (
        <div style={{ "textAlign": "center" }}>
            <img alt='' src={icon}></img> {value}<br />
        </div>
    )
}

export default City;