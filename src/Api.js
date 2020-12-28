const GetUrl = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'https://vynd-grepolis-map-api.herokuapp.com/'

function Call(endpoint) {
    return fetch(GetUrl() + endpoint)
        .then(res => res.json())
        .catch([])
}

export default Call;