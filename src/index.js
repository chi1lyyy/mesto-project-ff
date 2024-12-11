import './index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import {initialCards} from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, isValid } from './scripts/validatition.js';

const cardsContainer = document.querySelector('.places__list');

initialCards.forEach (function(card) {
    const cardElement = createCard(card, deleteCard, likeCard, openImagePopup);
    cardsContainer.append(cardElement);
});

//Popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

//Popups' buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardImg = document.querySelector('.card__image');
const closePopupButtons = document.querySelectorAll('.popup__close');

//popupEdit 
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');


//Popups' functions
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

editButton.addEventListener('click', () => {
    openPopup(popupEdit);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

cardImg.addEventListener('click', () => {
    openPopup(popupImg);
});

closePopupButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
         const popup = evt.target.closest('.popup');
         closePopup(popup);
     })
 });

//editprofile functional
function editProfile(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;

    closePopup(popupEdit);
}

popupEdit.addEventListener('submit', editProfile);

//add new cards
const newCardForm = popupNewCard.querySelector('.popup__form');

function addNewCard (evt) {
    evt.preventDefault();

    const cardTitle = newCardForm.querySelector('.popup__input_type_card-name').value;
    const imageUrl = newCardForm.querySelector('.popup__input_type_url').value;

    const cardData = {
        name: cardTitle,
        link: imageUrl,
        alt: cardTitle
    };

    const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);
    cardsContainer.prepend(newCard);

    closePopup(popupNewCard);
    newCardForm.reset();
}

newCardForm.addEventListener('submit', addNewCard);

//open image popup
export function openImagePopup (link, title) {
    const image = popupImg.querySelector('.popup__image');
    const caption = popupImg.querySelector('.popup__caption');

    image.src = link;
    caption.textContent = title;
    image.alt = title;
    
    openPopup(popupImg);
}

//Validation




enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });





