//ссылка
const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
};

//Вспомогательная функция ответа
const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}

const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET',
    })
        .then(res => parseResponse(res))
};

const setData = (productsIds) => {
    return fetch(`${api.url}/orders`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({ingredients: productsIds})
    })
        .then(res => parseResponse(res))
};
export { getData, setData }
