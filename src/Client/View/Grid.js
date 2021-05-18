import { LayerGroup, Polyline } from "react-leaflet"

function Grid() {
    const lineList = []
    for (let i = 0; i < 11; i++) {
        lineList.push(i * 100)
    }

    return (
        <LayerGroup>
            {lineList.map(l => {
                return (
                    <div key={`polyline${l}`}>
                        <Polyline positions={[[0, 1000 - l], [1000, 1000 - l]]} color="#000000" weight={1} key="vertical" />
                        <Polyline positions={[[l, 0], [l, 1000]]} color="#000000" weight={1} key="horizontal" />
                    </div>
                )
            })}
        </LayerGroup>
    )
}

export default Grid