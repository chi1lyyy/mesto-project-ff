
import { toDeleteCard, toLikeCard, unlikeCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, deleteCard, likeCard, openImagePopup, currentUser) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCount = cardElement.querySelector('.card__likes-number');


    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    likesCount.textContent = cardData.likes.length;

    const cardId = cardData._id;

    if (cardData.owner._id !== currentUser) {
        deleteButton.style.display = 'none';
    };
    
    deleteButton.addEventListener('click', () => {
       deleteCard(cardId, cardElement);
    });

    let isLiked = cardData.likes.some(user => user._id === currentUser);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active'); 
    }

    likeButton.addEventListener('click', (evt) => {
       evt.preventDefault();
       likeCard(cardId, likesCount, likeButton)
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    })

    return cardElement;
};

export function deleteCard (cardId, cardElement) {
    return toDeleteCard(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    });
};

export function likeCard (cardId, likesCount, likeButton) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    return (isLiked ? unlikeCard(cardId) : toLikeCard(cardId))
    .then((updatedCardData) => {
        likesCount.textContent = updatedCardData.likes.length;

        if(!isLiked) {
            likeButton.classList.add('card__like-button_is-active');
            return true;
        } else {
            likeButton.classList.remove('card__like-button_is-active');
            return false;
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

