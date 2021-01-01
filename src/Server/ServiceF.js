import { GetFromStore, PutInStore } from "./RepositoryF.js"
import { IsOutOfDate, GetCurrentSecondsSinceEpoch } from "./TimeF.js"
import World from './Models/World.js'
import { Log } from './LogF.js'

export const GetLiveWorldState = async (code) => {
    if (IsOutOfDate(await GetFromStore(code))) {
        PutInStore(code, PullFromWorldGrepolis(code))
    }
    return await GetFromStore(code)
}

const PullFromWorldGrepolis = (code) => {
    //TODO Grab from grepolis endpoint
    Log("Fetching world [" + code + "] from Grepolis")
    return new World({
        code: code,
        datetime: GetCurrentSecondsSinceEpoch(),
        alliances: [{
            id: 0,
            name: "Alliance 1 on world " + code,
            points: 99999,
            colour: "#8B5A00"
        }, {
            id: 1,
            name: "Alliance 2 on world " + code,
            points: 55599,
            colour: "#FF0000"
        }],
        players: [{
            id: 0,
            name: "Player 1",
            alliance: 0,
            points: 99999
        }, {
            id: 1,
            name: "Player 2",
            alliance: 1,
            points: 55599
        }],
        cities: [{
            id: 0,
            name: "City name 1",
            player: 0,
            points: 3123,
            x: 0,
            y: 5
        }, {
            id: 1,
            name: "City name 2",
            player: 0,
            points: 7235,
            x: 5,
            y: 0
        }, {
            id: 2,
            name: "City name 3",
            player: 1,
            points: 11111,
            x: 3,
            y: 3
        }]
    })
}