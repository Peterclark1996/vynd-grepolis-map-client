import { IsOutOfDate } from "./TimeF.js"
import World from './Models/World.js'
import { Log, LogError } from './LogF.js'

var cache = {}

export const GetFromStore = async (code) => {
    if (cache[code] == null) {
        const worldStateList = await World.find({ code: code })
        if (worldStateList.length > 0) {
            try {
                const worldState = GetLatestWorld(worldStateList)
                Log("Retrieved world [" + worldState.code + "] from datasource")
                cache[code] = worldState
            } catch {
                cache[code] = new World({
                    code: code,
                    datetime: GetCurrentSecondsSinceEpoch(),
                    alliances: [],
                    players: [],
                    cities: []
                })
            }
        }
    }
    return cache[code]
}

export const PutInStore = (code, worldState) => {
    if (!IsOutOfDate(GetFromStore(code))) {
        return
    }

    cache[code] = worldState

    worldState.save((error, document) => {
        (error) ? LogError(error) : Log("Inserted world [" + document.code + "] to datasource")
    })
}

const GetLatestWorld = (worldStateList) => {
    let currentLatest = null
    worldStateList.forEach(world => {
        if (currentLatest == null || world.datetime > currentLatest.datetime) currentLatest = world
    });
    return currentLatest
}