import './index.css';
import { createCard, deleteCard } from './scripts/card.js';
import {initialCards} from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';


const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

initialCards.forEach (function(card) {
    const cardElement = createCard(card, deleteCard);
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
editButton.addEventListener('click', () => {
    openPopup(popupEdit);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

//tranfer to createcards?
cardImg.addEventListener('click', () => {
    openPopup(popupImg);
});

closePopupButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
         const popup = evt.target.closest('.popup');
         closePopup(popup);
     })
 });


//TODO: add event listener on click to overlay to close modal;

//editprofile functional
function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;

    closePopup(popupEdit);
}

const formElement = document.querySelector('.popup__form');

formElement.addEventListener('submit', handleFormSubmit);















