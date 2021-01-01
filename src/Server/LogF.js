export function Log(message) {
    const datetime = Date().toLocaleString()
    console.log(datetime + ": " + message)
}

export function LogError(message) {
    const datetime = Date().toLocaleString()
    console.error(datetime + ": " + message)
}