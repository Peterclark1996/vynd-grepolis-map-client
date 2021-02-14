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

    try {
        const allianceColourHexList = ["#FF0000", "#8B5A00", "#FFC125", "#3D9140", "#00F5FF", "#0000FF", "#8470FF", "#4B0082", "#FF3E96", "#00FF00", "#808000", "#FFB6C1", "#8DB6CD", "#CD69C9", "#FFFF00", "#c95700", "#bfa16d", "#a2e800", "#008dd4", "#b33030", "#306b56", "#61c9bb", "#6bb048", "#365a6e"]
        const allianceColourHexGrey = "#8B8989"
        const allianceData = (await RequestAllianceData(code)).sort((a, b) => { return b.points - a.points })

        allianceData.push({
            id: 0,
            name: '_noAlliance',
            points: 0,
            cities: 0,
            players: 0,
            rank: 0
        })

        allianceData.forEach(a => {
            a.colour = allianceColourHexGrey
        })

        for (let i = 0; i < allianceColourHexList.length - 1; i++) {
            allianceData[i].colour = allianceColourHexList[i]
        }

        const playerData = await RequestPlayerData(code)
        const cityData = await RequestCityData(code)
        const islandData = await RequestIslandData(code)

        const cityOffsetRatio = 0.006
        const cityMaxSize = 0.25
        const cityMinSize = 0.1
        const cityMaxPoints = 17786
        cityData.forEach(city => {
            const island = islandData.filter(i => i.x === city.islandX && i.y === city.islandY)[0]
            const offset = GetCityOffsetForIsland(island.islandType, city.posOnIsland)

            //Perform transforms because leaflet and grepolis cant agree on which axis means what
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
    } catch (error) {
        LogError(`Failed to retrieve world '${code}' error: ${error}`)
    }
    return new World({
        code: code,
        datetime: GetCurrentSecondsSinceEpoch(),
        alliances: [],
        players: [],
        cities: []
    })
}