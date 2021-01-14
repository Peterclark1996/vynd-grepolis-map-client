import fetch from 'node-fetch';
import { LogError } from './LogF.js'

export const RequestAllianceData = async (code) => {
    return fetch("https://" + code + ".grepolis.com/data/alliances.txt")
        .then(res => res.text())
        .then(rawAllianceData => {
            let allianceData = []
            rawAllianceData.split("\n").forEach(alliance => {
                const values = alliance.split(",")
                allianceData.push({
                    id: Number(values[0]),
                    name: CleanName(values[1]),
                    points: Number(values[2]),
                    cities: Number(values[3]),
                    players: Number(values[4]),
                    rank: Number(values[5]),
                    colour: "#8B5A00"
                })
            });
            return allianceData;
        })
        .catch([])
}

export const RequestPlayerData = async (code) => {
    return fetch("https://" + code + ".grepolis.com/data/players.txt")
        .then(res => res.text())
        .then(rawPlayerData => {
            let playerData = []
            rawPlayerData.split("\n").forEach(player => {
                const values = player.split(",")
                playerData.push({
                    id: Number(values[0]),
                    name: CleanName(values[1]),
                    alliance: Number(values[2]),
                    points: Number(values[3]),
                    rank: Number(values[4]),
                    cities: Number(values[5])
                })
            });
            return playerData;
        })
        .catch([])
}

export const RequestCityData = async (code) => {
    return fetch("https://" + code + ".grepolis.com/data/towns.txt")
        .then(res => res.text())
        .then(rawCityData => {
            let cityData = []
            rawCityData.split("\n").forEach(city => {
                const values = city.split(",")
                cityData.push({
                    id: Number(values[0]),
                    playerId: Number(values[1]),
                    name: CleanName(values[2]),
                    islandX: Number(values[3]),
                    islandY: Number(values[4]),
                    numberOnIsland: Number(values[5]),
                    points: Number(values[6])
                })
            });
            return cityData
        })
        .catch([])
}

export const RequestIslandData = async (code) => {
    return fetch("https://" + code + ".grepolis.com/data/islands.txt")
        .then(res => res.text())
        .then(rawIslandData => {
            let islandData = []
            rawIslandData.split("\n").forEach(island => {
                const values = island.split(",")
                islandData.push({
                    id: Number(values[0]),
                    x: Number(values[1]),
                    y: Number(values[2]),
                    islandType: Number(values[3]),
                    availableTowns: Number(values[4]),
                    resourcePlus: values[5],
                    resourceMinus: values[6]
                })
            });
        })
        .catch([])
}

const RequestDataFromUrl = (url) =>
    new Promise(function (resolve, reject) {
        request({
            url: url,
            headers: { 'User-Agent': 'request' }
        }, function (error, response, body) {
            if (error) {
                LogError(error)
                resolve("");
            } else {
                resolve(body);
            }
        })
    })

const CleanName = (name) => {
    if (name == null) return ""
    name = name.split('+').join(' ');
    name = name.split('%27').join('\'');
    name = name.split('%2A').join('*');
    name = name.split('%3D').join('=');
    name = name.split('%3F').join('?');
    return name;
}