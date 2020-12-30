var cache = {}

export const GetFromStore = (code) => {
    const world = cache[code]
    if (world == null) {
        //TODO Try get from datastore
    }
    return world
}

export const PutInStore = (code, world) => {
    //TODO Datecheck first, return if invalid
    cache[code] = world

    //TODO Store world in datastore
}