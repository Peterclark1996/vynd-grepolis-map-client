import { GetWorldDataFromStore, PutWorldDataInStore } from '../Repositories/WorldDataRepository.js'
import { GenerateMapImage } from './MapImageService.js'
import { PutMapImageInStore } from '../Repositories/MapImageRepository.js'
import { IsOutOfDate, GetCurrentSecondsSinceEpoch } from '../Util/TimeF.js'
import World from '../Models/World.js'
import { Log } from '../Util/LogF.js'
import { RequestAllianceData, RequestPlayerData, RequestCityData, RequestIslandData, GetCityOffsetForIsland } from '../External/GrepolisF.js'
import { GetOceanList } from '../Constants/OceanConstants.js'
import { GetWorlds } from '../Services/WorldsService.js'

export const GetLiveWorldState = async code => {
    return await GetWorldDataFromStore(code)
}

export const UpdateAllWorlds = async () => {
    Log("Started updating worlds")
    const worlds = await GetWorlds()
    worlds.forEach(async world => {
        if (world.code === "en133") {
            await UpdateWorldData(world.code)
        }
    })
    Log("Finished updating worlds")
}

const UpdateWorldData = async code => {
    Log("Started updating world [" + code + "]")
    const pulledWorld = await GetWorldDataFromStore(code)
    if (!IsOutOfDate(pulledWorld) && pulledWorld.cities.length > 0) {
        Log("Finished updating world [" + code + "]. No update needed")
        return
    }

    const newPulledWorld = await PullWorldDataFromGrepolis(code)
    await PutWorldDataInStore(code, newPulledWorld)

    const oceans = GetOceanList()
    oceans.forEach(async ocean => {
        const generatedMapImage = await GenerateMapImage(code, ocean)
        if (generatedMapImage) {
            await PutMapImageInStore(code, ocean, generatedMapImage)
        }
    })
    Log("Finished updating world [" + code + "]. Pulled from grepolis")
}

const PullWorldDataFromGrepolis = async code => {
    Log("Fetching world [" + code + "] from Grepolis")

    try {
        const allianceColourHexList = ["#FF0000", "#8B5A00", "#FFC125", "#3D9140", "#00F5FF", "#0000FF", "#8470FF", "#4B0082", "#FF3E96", "#00FF00", "#808000", "#FFB6C1", "#8DB6CD", "#CD69C9", "#FFFF00", "#c95700", "#bfa16d", "#a2e800", "#008dd4", "#b33030", "#306b56", "#61c9bb", "#6bb048", "#365a6e"]
        const allianceColourHexGrey = "#8B8989"
        const allianceData = (await RequestAllianceData(code)).sort((a, b) => { return b.points - a.points })

        allianceData.push({
            id: 0,
            name: '',
            points: 0,
            cities: 0,
            players: 0,
            rank: 0
        })

        allianceData.forEach(a => {
            a.colour = allianceColourHexGrey
        })

        for (let i = 0; i < allianceColourHexList.length; i++) {
            allianceData[i].colour = allianceColourHexList[i]
        }

        const playerData = await RequestPlayerData(code)
        const cityData = await RequestCityData(code)
        const islandData = await RequestIslandData(code)

        const cityOffsetRatio = 0.0085
        const cityMaxSize = 0.25
        const cityMinSize = 0.1
        const cityMaxPoints = 17786
        cityData.forEach(city => {
            const island = islandData.filter(i => i.x === city.islandX && i.y === city.islandY)[0]
            const offset = GetCityOffsetForIsland(island.islandType, city.posOnIsland)

            city.x = (1000 - city.islandY + offset.y * cityOffsetRatio)
            city.y = (city.islandX + offset.x * cityOffsetRatio)

            city.size = cityMinSize + ((cityMaxSize - cityMinSize) * (city.points / cityMaxPoints))

            // const player = playerData.filter(p => p.id == city.playerId)[0]
            // city.allianceId = player ? player.alliance : 0
        })

        //TODO Optimise this by possibly using indexes, maybe precompute more so the front end can do less
        // const topAllianceIds = allianceData.filter(a => a.colour !== allianceColourHexGrey).map(a => a.id)
        // const citiesFromTopAlliances = cityData.filter(c => topAllianceIds.includes(c.allianceId))
        // const islandsWithCitiesFromTopAlliances = islandData.filter(i => citiesFromTopAlliances
        //     .some(c => c.islandX == i.x && c.islandY == i.y))

        const islandsWithCities = islandData.filter(i => cityData
            .some(c => c.islandX == i.x && c.islandY == i.y))

        return new World({
            code: code,
            datetime: GetCurrentSecondsSinceEpoch(),
            alliances: allianceData,
            players: playerData,
            cities: cityData,
            // islands: islandsWithCitiesFromTopAlliances
            islands: islandsWithCities
        })
    } catch (error) {
        LogError(`Failed to retrieve world '${code}' error: ${error}`)
    }
    return new World({
        code: code,
        datetime: GetCurrentSecondsSinceEpoch(),
        alliances: [],
        players: [],
        cities: [],
        islands: []
    })
}