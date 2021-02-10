import { LayerGroup, Polyline } from "react-leaflet"

function Grid() {
    return (
        <LayerGroup>
            <Polyline positions={[[0, 399], [1000, 399]]} color="#000000" />
            <Polyline positions={[[0, 499], [1000, 499]]} color="#000000" />
            <Polyline positions={[[0, 599], [1000, 599]]} color="#000000" />
            <Polyline positions={[[401, 0], [401, 1000]]} color="#000000" />
            <Polyline positions={[[501, 0], [501, 1000]]} color="#000000" />
            <Polyline positions={[[601, 0], [601, 1000]]} color="#000000" />
        </LayerGroup>
    )
}

export default Grid