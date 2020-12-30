import { IsOutOfDate } from "./TimeF.js"

var cache = {}

export const GetFromStore = (code) => {
    const world = cache[code]
    if (world == null) {
        //TODO Try get from datastore
    }
    return world
}

export const PutInStore = (code, world) => {
    if (!IsOutOfDate(cache[code])) {
        return
    }

    cache[code] = world

    //TODO Store world in datastore
}