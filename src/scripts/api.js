

const config = {
    path: 'https://mesto.nomoreparties.co/v1/wff-cohort-28',
    headers: {
        authorization: '73257957-f257-4700-80d8-fbcf29a02af0',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
}

export const getUserInfo = () => {
   return fetch(`${config.path}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
    }

    //4. Загрузка карточек с сервера

 export  const getCards = () => {
      return fetch(`${config.path}/cards`, {
            method: 'GET',
            headers: config.headers
        })
        .then(handleResponse)
    }
/*
    const getUsersInfo = () => {
        fetch(`${path}/users`, {
            method: 'GET',
            headers: {
                authorization: '73257957-f257-4700-80d8-fbcf29a02af0'
            }
        })
        .then((res) => {
            return res.json();
         })
         .then((users) => {
            console.log(users);
         })
    }
*/
/*5. Редактирование профиля
Отредактированные данные профиля должны сохраняться на сервере. Для этого отправьте запрос методом PATCH:
PATCH https://nomoreparties.co/v1/cohortId/users/me 
*/

export const changeProfileInfo = (newProfileInfo) => {
    return fetch(`${config.path}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(newProfileInfo)
    })
    .then(handleResponse)    
};
    
/*6. Добавление новой карточки
Чтобы добавить на сервер новую карточку, отправьте POST-запрос:
POST https://nomoreparties.co/v1/cohortId/cards 
*/

export const uploadNewCard = (newCardData) => {
    return fetch(`${config.path}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCardData)
    })
    .then(handleResponse)    
};

/*8. Удаление карточки
Прежде чем браться за работу с API, исправьте элемент карточки. Сделайте так, 
чтобы иконка удаления была только на созданных вами карточках, так как удалять 
чужие карточки нельзя.
*/
export const toDeleteCard = (cardId) => {
    return fetch(`${config.path}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)    
};

//9. Постановка и снятие лайка
export const toLikeCard = (cardId) => {
    return fetch(`${config.path}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse)    
};

export const unlikeCard = (cardId) => {
    return fetch(`${config.path}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)    
};

//10. Обновление аватара пользователя




