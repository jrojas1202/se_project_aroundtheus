class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput(inputElements) {
    return !inputElements.every((inputElement) => inputElement.validity.valid);
  }

  _disableButton(submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableButton(submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      return this._disableButton(this._submitButton);
    }
    this._enableButton(this._submitButton);
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
