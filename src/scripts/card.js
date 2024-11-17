
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

export function createCard (cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
};

export function deleteCard (cardElement) {
    cardElement.remove();
}
