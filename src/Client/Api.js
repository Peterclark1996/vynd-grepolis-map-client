export const GetUrl = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'https://grepolis-live-map.herokuapp.com/'

function Call(endpoint, params = {}) {
    return fetch(GetUrl() + endpoint + '?' + new URLSearchParams(params))
        .then(res => res.json())
        .catch([])
}

export default Call;