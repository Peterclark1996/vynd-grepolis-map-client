import { GetFromStore, PutInStore } from "./RepositoryF.js"
import { IsOutOfDate, GetCurrentSecondsSinceEpoch } from "./TimeF.js"
import World from './Models/World.js'
import { Log, LogError } from './LogF.js'
import { RequestAllianceData, RequestPlayerData, RequestCityData, RequestIslandData, GetCityOffsetForIsland, GetMaxSpotsForIsland } from './GrepolisF.js'

export const GetLiveWorldState = async (code) => {
    if (IsOutOfDate(await GetFromStore(code))) {
        const pulledWorld = await PullWorldDataFromGrepolis(code)
        await PutInStore(code, pulledWorld)
    }
    return await GetFromStore(code)
}

const PullWorldDataFromGrepolis = async (code) => {
    // TODO Make this atomic or similar to stop multiple calls to the grepolis at once 
    Log("Fetching world [" + code + "] from Grepolis")

    const allianceData = await RequestAllianceData(code)
    const playerData = await RequestPlayerData(code)
    const cityData = await RequestCityData(code)
    const islandData = await RequestIslandData(code)

    const cityOffsetRatio = 0.006
    const cityMaxSize = 0.25
    const cityMinSize = 0.05
    const cityMaxPoints = 17786
    cityData.forEach(city => {
        const island = islandData.filter(i => i.x === city.islandX && i.y === city.islandY)[0]
        const offset = GetCityOffsetForIsland(island.islandType, city.posOnIsland)

        //Perform transforms because leaflet and grepolis cant agree on which axis is which
        city.x = 1000 - city.islandY + offset.y * cityOffsetRatio
        city.y = city.islandX + offset.x * cityOffsetRatio

        city.size = cityMinSize + ((cityMaxSize - cityMinSize) * (city.points / cityMaxPoints))
    })

    return new World({
        code: code,
        datetime: GetCurrentSecondsSinceEpoch(),
        alliances: allianceData,
        players: playerData,
        cities: cityData
    })
}