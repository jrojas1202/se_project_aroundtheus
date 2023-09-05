import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._confirmButton = document.querySelector("#delete__button");
    this._saveButton = document.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = "Saving...";
    } else {
      this._confirmButton.textContent = "yes";
    }
  }

  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
}
