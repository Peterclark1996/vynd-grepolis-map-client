import * as React from 'react'
import { LayerGroup } from "react-leaflet";
import Player from './Player'

function Alliance({ state, alliance }) {
    return (
        <LayerGroup>
            {
                state.players
                    .filter(p => p.alliance === alliance.id)
                    .map(p => {
                        return <Player key={p.id} state={state} player={p} alliance={alliance} />
                    })
            }
        </LayerGroup>
    )
}

export default Alliance;