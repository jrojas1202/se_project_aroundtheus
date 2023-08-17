import { Popup } from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const values = {};
    this._form.querySelectorAll(".modal__input").forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }

  _submitHandler = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  close() {
    super.close();
    this._form.reset();
  }
}
