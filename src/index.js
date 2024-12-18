import './index.css';
import { createCard, deleteCard, likeCard} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { clearValidation, enableValidation} from './scripts/validatition.js';
import { getUserInfo, getCards, changeProfileInfo, uploadNewCard, updateProfileAvatar} from './scripts/api.js';

const cardsContainer = document.querySelector('.places__list');

Promise.all([getUserInfo(), getCards()])

    .then(([userData, cardsData]) => {
        avatar.style.backgroundImage = `url(${userData.avatar})`;
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;

        currentUser = userData._id;

        cardsData.forEach ((card) => {
            const cardElement = createCard(card, deleteCard, likeCard, openImagePopup, currentUser);
            cardsContainer.append(cardElement);
        });
    })
    .catch((error) => {
        console.log('Ошибка:', error);
    });
let currentUser;

//Popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_edit-avatar');

const image = popupImg.querySelector('.popup__image');
const caption = popupImg.querySelector('.popup__caption');

//Popups' buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');
const avatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription =  document.querySelector('.profile__description');


//popup inputs
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const avatarLinkInput = popupAvatar.querySelector('.popup__input_type_edit-avatar');

//forms
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = popupNewCard.querySelector('.popup__form[name="new-place"]');
const avatarForm = document.querySelector('.popup__form[name="edit-avatar"]');

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
    clearValidation(profileForm, validationConfig);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

function editProfile (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;


    const newProfileInfo  = {
        name: name,
        about: job
    };
    const saveButton = popupEdit.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    
    changeProfileInfo(newProfileInfo)
    .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
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
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    openPopup(popupNewCard);
});

function addNewCard (evt) {
    evt.preventDefault();

    const cardTitle = newCardForm.querySelector('.popup__input_type_card-name').value;
    const imageUrl = newCardForm.querySelector('.popup__input_type_url').value;

    const newCardData = {
        name: cardTitle,
        link: imageUrl,
        alt: cardTitle
    };
    const saveButton = popupNewCard.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';

    uploadNewCard(newCardData)
        .then((data) => {
            const newCard = createCard(data, deleteCard, likeCard, openImagePopup, currentUser);
            cardsContainer.prepend(newCard);
        
            closePopup(popupNewCard);
            newCardForm.reset();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            saveButton.textContent = 'Сохранить';
        })
};

newCardForm.addEventListener('submit', addNewCard);

//edit avatar popup
avatar.addEventListener('click', () => {
    openPopup(popupAvatar);
    clearValidation(avatarForm, validationConfig);
    avatarForm.reset();
});

function updateAvatar (evt) {
    evt.preventDefault();
   
    const avatarLink = avatarLinkInput.value;

    const saveButton = popupAvatar.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    
    updateProfileAvatar(avatarLink)
    .then((data) => {
        avatar.style.backgroundImage = `url(${data.avatar})`;
    
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

function openImagePopup (link, title) {
    image.src = link;
    caption.textContent = title;
    image.alt = title;
    
    openPopup(popupImg);
};

enableValidation(validationConfig);







