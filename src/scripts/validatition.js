// в файле validzation.js описаны функции для валидации форм. 
// Из файла экспортируется только функция активации валидации 
// enableValidation и функция очистки ошибок валидации clearValidation;

//checking input validity 
function isValid (formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    //showError
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    //hideError
    hideError(formElement, inputElement);
  }
}

// calling Errors
function showError (formElement, inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage; 
  errorElement.classList.add('popup__error_visible');
}

function hideError (formElement, inputElement) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove('.popup__input_type_error');
  errorElement.textContent = ''; 
  errorElement.classList.remove('.popup__error_visible');
}

//adding event listeners

function setEventListeners (formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
};


 //disabling button 

const toggleSubmitButton = (formElement, submitButtonSelector, inactiveButtonClass) => {

  const submitButton = document.querySelector(submitButtonSelector);
  console.log(submitButton)
}


export function enableValidation ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
      setEventListeners(formElement)
    });
}



/*Корректно работает валидация форм:
настроена валидация всех форм проекта;
функция enableValidation принимает объект настроек, которые используются при валидации;
настройки валидации полей ввода соответствуют заданию;
если поле ввода не проходит валидацию, то под ним отображается текст ошибки;
поля «Имя» и «О себе» формы редактирования профиля и поле «Название» формы добавления карточки валидируются с помощью регулярного выражения;
если поле ввода не проходит валидацию регулярным выражением, то текст ошибки должен быть кастомный;
если хотя бы одно из полей формы не прошло валидацию, то кнопка отправки формы должна быть неактивной, иначе она должна иметь активное состояние;
при заполнении полей формы профиля и при очистке формы добавления карточки должна вызываться очистка валидации. */
