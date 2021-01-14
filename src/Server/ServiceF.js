import { GetFromStore, PutInStore } from "./RepositoryF.js"
import { IsOutOfDate, GetCurrentSecondsSinceEpoch } from "./TimeF.js"
import World from './Models/World.js'
import { Log } from './LogF.js'
import { RequestAllianceData, RequestPlayerData, RequestCityData, RequestIslandData } from './GrepolisF.js'

export const GetLiveWorldState = async (code) => {
    if (IsOutOfDate(await GetFromStore(code))) {
        await PutInStore(code, await PullWorldDataFromGrepolis(code))
    }
    return await GetFromStore(code)
}

const PullWorldDataFromGrepolis = async (code) => {
    // TODO Make this atomic or similar to stop multiple calls to the grepolis at once 
    Log("Fetching world [" + code + "] from Grepolis")
    return new World({
        code: code,
        datetime: GetCurrentSecondsSinceEpoch(),
        alliances: await RequestAllianceData(code),
        players: await RequestPlayerData(code),
        cities: await RequestCityData(code),
        islands: await RequestIslandData(code)
    })
}