const _getResponseData = (res) => {
    if (!res.ok) {
        return res.json().then(response => { throw new Error(response.message) });
    }
    return res.json();
}

export const searchArticles = (query) => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${query}&from=${lastWeek}&to=${today.toISOString()}&sortBy=popularity&apiKey=12d48e6f7e13455481124697940a37e4`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => _getResponseData(res));
}