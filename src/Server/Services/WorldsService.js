import { GetWorldsFromStore } from "../Repositories/WorldsRepository.js"

export const GetWorlds = async () => {
    return await GetWorldsFromStore()
}