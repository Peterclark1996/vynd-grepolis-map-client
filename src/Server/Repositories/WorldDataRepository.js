import { IsOutOfDate } from "../Util/TimeF.js"
import World from '../Models/World.js'
import { Log, LogError } from '../Util/LogF.js'
import { GetCurrentSecondsSinceEpoch } from "../Util/TimeF.js"

var cache = {}

export const GetWorldDataFromStore = async (code) => {
    if (cache[code] == null) {
        try {
            const worldStateList = await World.find({ code: code })

            if (worldStateList.length == 0) throw new Error("Failed to retrieve world")

            const worldState = GetLatestWorld(worldStateList)
            Log("Retrieved world [" + worldState.code + "] from datasource")
            cache[code] = worldState
        } catch (error) {
            Log("Failed to retrieve world [" + code + "] from datasource")
            cache[code] = new World({
                code: code,
                datetime: GetCurrentSecondsSinceEpoch(),
                alliances: [],
                players: [],
                cities: []
            })
        }
    }
    return cache[code]
}

export const PutWorldDataInStore = async (code, worldState) => {
    if (!IsOutOfDate(GetWorldDataFromStore(code))) {
        return
    }

    cache[code] = worldState

    World.deleteMany({ code: code })
        .then(worldState.save((error, document) => (error) ? LogError(error) : Log("Inserted world [" + document.code + "] to datasource")))
        .catch((error) => LogError(error))
}

const GetLatestWorld = (worldStateList) => {
    let currentLatest = null
    worldStateList.forEach(world => {
        if (currentLatest == null || world.datetime > currentLatest.datetime) currentLatest = world
    })
    return currentLatest
}