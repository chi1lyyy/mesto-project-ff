export function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlay)
};

function closeByEscape(evt) {  
    if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
    }
};

function closeByOverlay (evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(evt.target);
        }
    };

export function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlay)
};
