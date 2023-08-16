//Error Functions

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.add(inputErrorClass);

  if (errorMessageElement) {
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.remove(inputErrorClass);

  if (errorMessageElement) {
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
  }
}

// VALIDATION OF INPUT

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

// disable button functions
function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

// enable button function
function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// TOGGLE BUTTON

function toggleButtonState(inputElements, submitButton, validationConfig) {
  const { inactiveButtonClass } = validationConfig;

  const checkFormValidity = (inputElements) =>
    inputElements.every((inputElement) => inputElement.validity.valid);

  const isFormValid = checkFormValidity(inputElements);
  if (isFormValid) {
    enableButton(submitButton, inactiveButtonClass);
  } else {
    disableButton(submitButton, inactiveButtonClass);
  }
}

// setEventListener FUNCTION

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

// Config

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

enableValidation(validationSettings);

export const addCardModal = document.querySelector("#new-card-modal");
export const addCardForm = addCardModal.querySelector(".modal__form");
