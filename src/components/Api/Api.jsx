//ссылка
export const Api = {
    url: 'https://norma.nomoreparties.space/api/ingredients',
    headers: {
        'Content-Type': 'aplication.json'
    }
};

//Вспомогательная функция ответа
export const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}