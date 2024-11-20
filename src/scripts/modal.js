export function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup__close');
    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.addEventListener('click', (evt) => {
        if(evt.target !== popup) {
            closePopup(popup);
        }
    })
};

export function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
};
