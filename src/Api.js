function Call(endpoint) {
    return fetch(GetUrl() + endpoint)
        .then(res => res.json())
        .catch([])
}

function GetUrl() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000/'
    } else {
        return ''
    }
}

export default Call;