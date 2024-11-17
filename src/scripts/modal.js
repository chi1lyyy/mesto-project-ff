export function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
            closePopup(popup);
        }
    })
};

export function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
};
