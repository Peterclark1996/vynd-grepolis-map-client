import * as React from 'react'
import { LayerGroup } from "react-leaflet";
import Player from './Player'
import * as MapLayers from '../Context/MapLayerContext'

function Alliance({ state, alliance }) {
    const layerRef = React.useRef()

    const [, setMapLayers] = MapLayers.useMapLayers()
    React.useEffect(() => {
        setMapLayers(mapLayers =>
            mapLayers.concat([{
                id: alliance.id,
                ref: layerRef
            }])
        )
    }, [setMapLayers, alliance.id])

    return (
        <LayerGroup ref={layerRef}>
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