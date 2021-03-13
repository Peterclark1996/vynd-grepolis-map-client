import { LayerGroup, ImageOverlay } from "react-leaflet"
import { GetUrl } from "../Api"

function OceanImages({ worldCode }) {
    const oceanList = []
    for (let x = 1; x < 9; x++) {
        for (let y = 1; y < 9; y++) {
            oceanList.push({
                x: x, y: y
            })
        }
    }

    return (
        <>
            {worldCode && worldCode.code ?
                <LayerGroup>
                    {oceanList.map(o => {
                        return (<ImageOverlay
                            url={GetUrl() + "getMapImage?world=" + worldCode.code + "&ocean=" + o.x + o.y}
                            bounds={[
                                [GetCoordsForOcean(o.x, o.y).coordX, GetCoordsForOcean(o.x, o.y).coordY],
                                [GetCoordsForOcean(o.x, o.y).coordX + 100, GetCoordsForOcean(o.x, o.y).coordY + 100]
                            ]}
                        />)
                    })}
                </LayerGroup> :
                <></>
            }
        </>
    )
}

const GetCoordsForOcean = (oceanX, oceanY) => ({
    coordX: (9 - oceanY) * 100,
    coordY: oceanX * 100
})

export default OceanImages