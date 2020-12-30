export const GetCurrentSecondsSinceEpoch = () => Math.floor((new Date() / 1000) / 60)

export const IsOutOfDate = (world) => world == null || world.datetime == null ? true : IsDateOverOneHourAgo(world.datetime)

const IsDateOverOneHourAgo = (secondsSinceEpoch) => GetCurrentSecondsSinceEpoch() > secondsSinceEpoch + 60