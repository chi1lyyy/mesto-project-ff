import './index.css';
import { createCard} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { clearValidation, enableValidation} from './scripts/validatition.js';
import { getUserInfo, getCards, changeProfileInfo, uploadNewCard, updateProfileAvatar } from './scripts/api.js';

const cardsContainer = document.querySelector('.places__list');
export let currentUser;

Promise.all([getUserInfo(), getCards()])

    .then(([userData, cardsData]) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
        document.querySelector('.profile__title').textContent = userData.name;
        document.querySelector('.profile__description').textContent = userData.about;

        currentUser = userData._id;

        cardsData.forEach ((card) => {
            const cardElement = createCard(card, openImagePopup);
            cardsContainer.append(cardElement);
        });
    })
    .catch((error) => {
        console.log('Ошибка:', error);
    });

//Popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_edit-avatar');

//Popups' buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardImg = document.querySelector('.card__image');
const closePopupButtons = document.querySelectorAll('.popup__close');
const avatar = document.querySelector('.profile__image');
const saveButton = document.querySelector('.popup__button');

//popup inputs
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const avatarLinkInput = popupAvatar.querySelector('.popup__input_type_edit-avatar');

//forms
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');

const validationConfig = { 
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

//Popups' functions


popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

//Edit profile info functions

editButton.addEventListener('click', () => {
    openPopup(popupEdit);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

function editProfile (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;


    const newProfileInfo  = {
        name: name,
        about: job
    };
    saveButton.textContent = 'Сохранение...';
    
    changeProfileInfo(newProfileInfo)
    .then((data) => {
        document.querySelector('.profile__title').textContent = data.name;
        document.querySelector('.profile__description').textContent = data.about;
        closePopup(popupEdit);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        saveButton.textContent = 'Сохранить';
    })
};

popupEdit.addEventListener('submit', editProfile);

//add new cards functions

addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

const newCardForm = popupNewCard.querySelector('.popup__form[name="new-place"]');

function addNewCard (evt) {
    evt.preventDefault();

    const cardTitle = newCardForm.querySelector('.popup__input_type_card-name').value;
    const imageUrl = newCardForm.querySelector('.popup__input_type_url').value;

    const newCardData = {
        name: cardTitle,
        link: imageUrl,
        alt: cardTitle
    };

    saveButton.textContent = 'Сохранение...';

    uploadNewCard(newCardData)
        .then((data) => {
            const newCard = createCard(data, openImagePopup);
            cardsContainer.prepend(newCard);
        
            newCardForm.reset();
            closePopup(popupNewCard);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
        
            saveButton.textContent = 'Сохранить';
        })
};

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

//edit avatar popup
avatar.addEventListener('click', () => {
    openPopup(popupAvatar);

    avatarLinkInput.value = document.querySelector('.profile__image').style.backgroundImage;
});

function updateAvatar (evt) {
    evt.preventDefault();
    const avatar = avatarLinkInput.value;

    saveButton.textContent = 'Сохранение...';
    
    updateProfileAvatar(avatar)
    .then((data) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
    
        closePopup(popupAvatar);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        saveButton.textContent = 'Сохранить';
    })
};

popupAvatar.addEventListener('submit', updateAvatar);

//closing popups

closePopupButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
         const popup = evt.target.closest('.popup');
         closePopup(popup);
     })
 });



enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });







