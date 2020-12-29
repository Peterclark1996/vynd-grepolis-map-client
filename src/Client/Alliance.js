import * as React from 'react'
import { LayersControl, LayerGroup } from "react-leaflet";
import Player from './Player'

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

export default Alliance;