import { currentUser } from "../index.js";
import { toDeleteCard, toLikeCard, unlikeCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, openImagePopup) {
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
        toDeleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
    });

    let isLiked = cardData.likes.some(user => user._id === currentUser);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active'); 
    }

    likeButton.addEventListener('click', (evt) => {
       evt.preventDefault();
       
       if (!isLiked) {
        toLikeCard(cardId)
        .then((updatedCardData) => {
            likesCount.textContent = updatedCardData.likes.length;
            likeButton.classList.add('card__like-button_is-active');
            isLiked = true;                
        })
       } else {
        unlikeCard(cardId)
        .then((updatedCardData) => {
            likesCount.textContent = updatedCardData.likes.length;
            likeButton.classList.remove('card__like-button_is-active'); 
            isLiked = false; 
        })
       }
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    })


    return cardElement;
};

export function deleteCard (cardElement) {
    cardElement.remove();
}

