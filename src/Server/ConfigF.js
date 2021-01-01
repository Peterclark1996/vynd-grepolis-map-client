import { readFileSync } from 'fs'
import { LogError } from './LogF.js'

export const GetConfigDatasourceUrl = () => IsProduction() ? process.env.datasourceUrl : ReadFromLocalConfig('datasourceUrl')

export const IsProduction = () => process.env.NODE_ENV === 'production'

const ReadFromLocalConfig = (configKey) => {
    const data = readFileSync('./src/Server/ConfigVars.json', 'utf-8', (error) => {
        if (error) {
            LogError('Failed to get config [' + configKey + '], error: ' + error)
        }
    })
    return JSON.parse(data)[configKey]
}