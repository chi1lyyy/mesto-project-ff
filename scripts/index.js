const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard (cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
};

initialCards.forEach (function(card) {
    const cardElement = createCard(card, cardElement => {
        cardElement.remove();
    });
    placesList.append(cardElement);
});