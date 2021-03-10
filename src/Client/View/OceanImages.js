import { LayerGroup, ImageOverlay } from "react-leaflet"

function OceanImages({ worldCode }) {
    return (
        <>
            {worldCode && worldCode.code ?
                <LayerGroup>
                    <ImageOverlay
                        url={"http://localhost:5000/getMapImage?world=" + worldCode.code + "&ocean=55"}
                        bounds={[[400, 500], [500, 600]]}
                    />
                    <ImageOverlay
                        url={"http://localhost:5000/getMapImage?world=" + worldCode.code + "&ocean=44"}
                        bounds={[[500, 400], [600, 500]]}
                    />
                    <ImageOverlay
                        url={"http://localhost:5000/getMapImage?world=" + worldCode.code + "&ocean=54"}
                        bounds={[[500, 500], [600, 600]]}
                    />
                    <ImageOverlay
                        url={"http://localhost:5000/getMapImage?world=" + worldCode.code + "&ocean=45"}
                        bounds={[[400, 400], [500, 500]]}
                    />
                </LayerGroup> :
                <></>
            }
        </>
    )
}

export default OceanImages