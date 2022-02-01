export const BASE_URL = 'https://api.gilad2.students.nomoreparties.sbs';

const _getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(res);
    }
    return res.json();
}

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email, name })
    })
        .then((response) => _getResponseData(response));
};
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => _getResponseData(response))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        });
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => _getResponseData(res));
}

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
    })
        .then(res => _getResponseData(res))
}
export const saveCard = (data) => {
    return fetch(`${BASE_URL}/articles`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => _getResponseData(res))
}


export const getSavedCards = () => {
    return fetch(`${BASE_URL}/articles`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
    })
        .then(res => _getResponseData(res))
}

export const deleteCard = (cardId) => {
    return fetch(`${BASE_URL}/articles/${cardId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: 'DELETE'
    })
        .then(res => _getResponseData(res))
}