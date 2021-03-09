import { LayerGroup, Polyline } from "react-leaflet"

function Grid() {
    return (
        <LayerGroup>
            <Polyline positions={[[0, 300], [1000, 300]]} color="#000000" weight={1} />
            <Polyline positions={[[0, 400], [1000, 400]]} color="#000000" weight={1} />
            <Polyline positions={[[0, 500], [1000, 500]]} color="#000000" weight={1} />
            <Polyline positions={[[0, 600], [1000, 600]]} color="#000000" weight={1} />
            <Polyline positions={[[0, 700], [1000, 700]]} color="#000000" weight={1} />
            <Polyline positions={[[300, 0], [300, 1000]]} color="#000000" weight={1} />
            <Polyline positions={[[400, 0], [400, 1000]]} color="#000000" weight={1} />
            <Polyline positions={[[500, 0], [500, 1000]]} color="#000000" weight={1} />
            <Polyline positions={[[600, 0], [600, 1000]]} color="#000000" weight={1} />
            <Polyline positions={[[700, 0], [700, 1000]]} color="#000000" weight={1} />
        </LayerGroup>
    )
}

export default Grid