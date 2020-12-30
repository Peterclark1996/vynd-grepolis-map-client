export const IsOutOfDate = (world) => world == null || world.datetime == null ? true : IsDateOverOneHourAgo(world.datetime)

const IsDateOverOneHourAgo = (datetime) => {
    const hour = 1000 * 60 * 60;
    const anHourAgo = Date.now() - hour;
    return new Date(datetime) <= anHourAgo;
}