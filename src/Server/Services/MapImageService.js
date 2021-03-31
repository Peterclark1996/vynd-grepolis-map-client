import Jimp from 'jimp'
import { GetWorldDataFromStore } from "../Repositories/WorldDataRepository.js"
import { GetIslandImage } from "../Constants/ImageConstants.js"
import { GetMapImageFromStore } from "../Repositories/MapImageRepository.js"
import MapImage from '../Models/MapImage.js'

const oceanSizeInPixels = 1000
const oceanOverlap = 20

export const GetMapImage = async (code, ocean) => {
    const oceanImageData = await GetMapImageFromStore(code, ocean)
    if (oceanImageData.imageData) {
        return Buffer.from(oceanImageData.imageData.replace(/^data:image\/png;base64,/, ""), "base64")
    }
    return Buffer.from('')
}

export const GenerateMapImage = async (world, ocean) => {
    const oceanCoords = GetOceanCoordinates(ocean)
    const oceanOffsetX = oceanCoords.x * 100
    const oceanOffsetY = oceanCoords.y * 100
    const islandBoundMinX = oceanOffsetX - oceanOverlap
    const islandBoundMaxX = oceanOffsetX + 100 + oceanOverlap
    const islandBoundMinY = oceanOffsetY - oceanOverlap
    const islandBoundMaxY = oceanOffsetY + 100 + oceanOverlap

    const worldState = await GetWorldDataFromStore(world)

    const islandsInOcean = worldState.islands
        .filter(
            i => i.x > islandBoundMinX &&
                i.x < islandBoundMaxX &&
                i.y > islandBoundMinY &&
                i.y < islandBoundMaxY)

    if (islandsInOcean.length == 0) {
        return
    }

    const oceanImage = await Jimp.read('./public/Images/sea.png')
    oceanImage.resize(1000, 1000)

    for (const i of islandsInOcean) {
        const islandImage = await GetIslandImage(i.islandType)
        if (islandImage) {
            oceanImage.composite(
                islandImage,
                ((i.x - oceanOffsetX) / 100) * oceanSizeInPixels,
                ((i.y - oceanOffsetY) / 100) * oceanSizeInPixels)
        }
    }

    const base64Image = await oceanImage.getBase64Async(Jimp.AUTO)
    return new MapImage({
        code: world,
        ocean: ocean,
        imageData: base64Image
    })
}

const GetOceanCoordinates = oceanName => {
    if (oceanName.length == 2) {
        return {
            x: parseInt(oceanName.substring(0, 1)),
            y: parseInt(oceanName.substring(1))
        }
    }
    //TODO Return correctly for oceans with a 10 x or 10 y
    return {
        x: 0,
        y: 0
    }
}