import MapImage from '../Models/MapImage.js'
import { Log, LogError } from '../Util/LogF.js'

var cache = []

export const GetMapImageFromStore = async (code, ocean) => {
    if (!cache.some(element => element.code == code && element.ocean == ocean)) {
        try {
            const retrievedImages = await MapImage.find({ code: code, ocean: ocean })

            if (retrievedImages.length == 0) throw new Error("Failed to retrieved map image")

            Log("Retrieved image for ocean [" + ocean + "] on world [" + code + "] from datastore")
            cache.push(retrievedImages[0])
        } catch (error) {
            Log("Failed to retrieved ocean [" + ocean + "] on world [" + code + "] from datasource")
            cache.push(new MapImage({
                code: code,
                ocean: ocean,
                imageData: null
            }))
        }
    }
    return cache.filter(element => element.code == code && element.ocean == ocean)[0]
}

export const PutMapImageInStore = async (code, ocean, image) => {
    cache = cache.filter(element => !(element.code == code && element.ocean == ocean))
    cache.push(image)

    MapImage.deleteMany({ code: code, ocean: ocean })
        .then(image.save((error, document) => (error) ? LogError(error) : Log("Inserted image for ocean [" + ocean + "] on world [" + code + "] from datastore")))
        .catch((error) => LogError(error))
}