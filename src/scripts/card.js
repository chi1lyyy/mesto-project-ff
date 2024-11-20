
import { openImagePopup } from "..";
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const popupImg = document.querySelector('.popup_type_image');

export function createCard (cardData, deleteCard, likeCard, openImage) {
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
        evt.target.classList.toggle('card__like-button_is-active');
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    })


    return cardElement;
};

export function deleteCard (cardElement) {
    cardElement.remove();
}



