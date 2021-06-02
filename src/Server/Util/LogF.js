const timeZone = 'en-GB'

export function Log(message) {
    const datetime = new Date().toLocaleString(timeZone)
    console.log(datetime + ": " + message)
}

export function LogError(message) {
    const datetime = new Date().toLocaleString(timeZone)
    console.error(datetime + ": " + message)
}