// в файле validzation.js описаны функции для валидации форм. 
// Из файла экспортируется только функция активации валидации 
// enableValidation и функция очистки ошибок валидации clearValidation;

//checking input validity 
function isValid (formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    //showError
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    //hideError
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// calling Errors
function showError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass);
}

function hideError (formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = ''; 
  errorElement.classList.remove(errorClass);
}

//adding event listeners

function setEventListeners (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleSubmitButton(inputs, buttonElement, inactiveButtonClass);
    });
  });
};

 //disabling button 

function toggleSubmitButton (inputs, buttonElement, inactiveButtonClass)  {
  const isInputValid = Array.from(inputs).every(input => input.validity.valid);
  buttonElement.disabled = !isInputValid;

  if(buttonElement.disabled) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
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
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
    });
};

export function clearValidation(formElement, {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));

  inputs.forEach((inputElement) => {
    hideError (formElement, inputElement, inputErrorClass, errorClass);
  });
  
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleSubmitButton (inputs, buttonElement, inactiveButtonClass)
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
