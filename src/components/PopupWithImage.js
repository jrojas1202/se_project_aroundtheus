import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = document.querySelector("#popup-image");
    this._text = document.querySelector("#popup-text");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
    super.open();
  }
}
