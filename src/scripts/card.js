
import { openImagePopup } from '../index.js';
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, deleteCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');


    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    likeButton.addEventListener('click', (evt) => {
        likeCard(evt.target);
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    })


    return cardElement;
};

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function deleteCard (cardElement) {
    cardElement.remove();
}



